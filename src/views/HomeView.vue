<script>
import axios from 'axios';
import WeatherConditions from '../components/WeatherConditions.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherConditions,
  },
  data() {
    return {
      // The latitude & longitude of the location we're going to retrieve the weather data for
      locationData: {},

      // The weather data will live here when the OpenWeather API call returns
      weatherData: {},

      // The default weather units will be imperial/US units, but can change to metric
      weatherUnits: 'imperial'
    }
  },
  created() {
    // Kick off a call to get the user's location so we can start fetching weather data
    this.getUserLocation();
  },
  watch: {
    locationData() {
      this.getWeatherData();
    },
    weatherUnits() {
      this.getWeatherData();
    }
  },
  methods: {
    // Toggle the weather units between imperial and metric measurement systems
    toggleUnits() {
      this.weatherUnits = this.weatherUnits == 'imperial' ? 'metric' : 'imperial'
    },
    // Retrieve the OpenWeather data via a call to an API proxy and obscures the API key so it's not exposed on the front end
    getWeatherData() {
      if (this.locationData.latitude && this.locationData.longitude) {
        // Get weather data for the lat/long combo
        const apiUrl = `http://localhost:3000/weather/${this.locationData.latitude}/${this.locationData.longitude}/${this.weatherUnits}`;

        axios
          .get(apiUrl)
          .then((response) => {
            this.weatherData = response.data;
          }, (e) => {
            // DISPLAY ERROR MSG ON PAGE
            console.log("ERROR!", e.message);
          });
      }
      else {
        console.log("No location!");
      }
    },
    // Get users' current location
    getUserLocation() {
      // Check if geolocation is supported by the browser
      const isSupported = 'navigator' in window && 'geolocation' in navigator

      if (isSupported) {
        // Retrieve the user's current position
        navigator.geolocation.getCurrentPosition(async (position) => {
          // Geocode the name of the city
          const googleGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&latlng=${position.coords.latitude},${position.coords.longitude}`

          await axios
            .get(googleGeocodeUrl)
            .then((response) => {
              const sanitizedAddress = this.getHumanReadableLocationName(response.data.results[0].address_components);

              this.locationData = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                city: sanitizedAddress
              };
            });
          });
        }
      },
      // Parse a Google Maps-provided object of address components for a human-readable location display string
      getHumanReadableLocationName(addressComponents) {
        return addressComponents
          .filter(n => [ 'neighborhood', 'locality', 'administrative_area_level_1', 'country' ].includes(n.types[0]))
          .map(n => n.long_name).join(', ');
      },
      autoCompletedLocationSelected(autoCompletedPlace) {
        this.locationData = {
          latitude: autoCompletedPlace.geometry.location.lat(),
          longitude: autoCompletedPlace.geometry.location.lng(),
          city: this.getHumanReadableLocationName(autoCompletedPlace.address_components)
        };
      }
    }
  }
</script>

<template>
  <div v-if="locationData.city" class="mb-4 mt-2">
    <div class="block">
      <GMapAutocomplete
        @click="$event.target.value = ''"
        @place_changed="autoCompletedLocationSelected"
        class="border border-solid mt-1 py-1 px-2 w-80"  
        id="location-autocomplete"
        placeholder="Find the dew point in another location!"
        />

        <button
          @click="getUserLocation()"
          class="ml-2 py-1 px-2 text-sm">
            🎯 Use my location
        </button>
    </div>

    <button
      @click="toggleUnits"
      class="text-xs">
      🌡️ Change units to {{ weatherUnits == 'imperial' ? 'celsius' : 'imperial' }}
    </button>
  </div>

  <div class="my-8 text-2xl">
    📍 {{ locationData.city }}
  </div>

  <WeatherConditions
    v-if="weatherData"
    :conditions="weatherData"
    :location="locationData"
    :units="weatherUnits"
  />

</template>
