<script>
import axios from 'axios';
import WeatherConditions from '../components/weather/WeatherConditions.vue';
import NetworkError from '../components/errors/NetworkError.vue';
import LocationError from '../components/errors/LocationError.vue';
import LoadingStatus from '../components/loading/LoadingStatus.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherConditions,
    NetworkError,
    LocationError,
    LoadingStatus
  },
  data() {
    return {
      // Are we loading anything?
      isLoading: true,

      // Is there a network error?
      isNetworkError: false,

      // Is there a location error?
      isGeolocationError: false,
      isRouteLocationError: false,

      // The latitude & longitude of the location we're going to retrieve the weather data for
      locationData: {},

      // The weather data will live here when the OpenWeather API call returns
      weatherData: {},

      // The default weather units will be imperial/US units, but can change to metric
      weatherUnits: 'imperial'
    }
  },
  async created() {
    // If the URL route includes at a latitude, longitude, and units, pre-load the location data, else kick off geolocation
    const { lat, lng } = this.$route.params;

    if (lat && lng) {
      // Geocode the lat and long to get more information about the location
      this.locationData = await this.geocodeByLatitudeAndLongitude(lat, lng);
    }
    else {
      this.getUserLocation();
    }    
  },
  watch: {
    // Kick off a call to get weather data when the location data is updated, either by geolocation or manual entry...
    locationData() {
      this.$router.push({ path: `/${this.locationData.latitude}/${this.locationData.longitude}` });

      this.getWeatherData();
    },
    // ...and also when we change weather units (i.e. switching between imperial and metric units)
    weatherUnits() {
      this.getWeatherData();
    }
  },
  methods: {
    // Toggle the weather units between imperial and metric measurement systems
    toggleUnits() {
      this.weatherData = {};
      this.weatherUnits = this.weatherUnits == 'imperial' ? 'metric' : 'imperial'
    },
    // Retrieve the OpenWeather data via a call to an API proxy and obscures the API key so it's not exposed on the front end
    getWeatherData() {
      this.isLoading = true;

      if (this.locationData.latitude && this.locationData.longitude) {
        // Get weather data for the lat/long combo
        const apiUrl = `http://localhost:3000/weather/${this.locationData.latitude}/${this.locationData.longitude}/${this.weatherUnits}`;

        axios
          .get(apiUrl)
          .then((response) => {
            // Clear any network error flags that may be set
            this.isNetworkError = false;
            this.isLoading = false;

            this.weatherData = response.data;
          }, 
          
          // When receiving an error back from the API call
          () => {
            this.isNetworkError = true;
            this.isLoading = false;
          });
      }
      else {
        this.isGeolocationError = true;
        this.isLoading = false;
      }
    },
    // Get users' current location
    getUserLocation() {
      this.isLoading = true;

      // Check if geolocation is supported by the browser
      const isSupported = 'navigator' in window && 'geolocation' in navigator;

      if (isSupported) {
        // Retrieve the user's current position
        navigator.geolocation.getCurrentPosition(async (position) => {
          // Geocode the name of the city
            this.locationData = await this.geocodeByLatitudeAndLongitude(position.coords.latitude, position.coords.longitude);
            this.isLoading = false;
          }, 

          // When receiving an error from the browser's geolocation API
          () => {
            this.isGeolocationError = true;
            this.isLoading = false;
          });
        }
        else {
          this.isGeolocationError = true;
          this.isLoading = false;
        }
      },
      // Parse a Google Maps-provided object of address components for a human-readable location display string
      getHumanReadableLocationName(addressComponents) {
        return addressComponents
          .filter(n => [ 'neighborhood', 'locality', 'administrative_area_level_1', 'country' ].includes(n.types[0]))
          .map(n => n.long_name).join(', ');
      },
      autoCompletedLocationSelected(autoCompletedPlace) {
        // Clear any geolocation error flags that may be set to true
        this.isGeolocationError = false;
        this.isRouteLocationError = false;

        // Set the location data with the autocompleted location's lat/long and its geocoded city name
        this.locationData = {
          latitude: autoCompletedPlace.geometry.location.lat(),
          longitude: autoCompletedPlace.geometry.location.lng(),
          city: this.getHumanReadableLocationName(autoCompletedPlace.address_components)
        };
      },
      async geocodeByLatitudeAndLongitude(latitude, longitude) {
        const googleGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&latlng=${latitude},${longitude}`

        const geocodeResult = await axios
          .get(googleGeocodeUrl)
          .then((response) => {
            const sanitizedAddress = this.getHumanReadableLocationName(response.data.results[0].address_components);

            // this.locationData = {
            return {
              latitude: latitude,
              longitude: longitude,
              city: sanitizedAddress
            };
          },

          (error) => {
            this.isRouteLocationError = true;
            return error;
          });

        return geocodeResult;
      }
    }
  }
</script>

<template>
  <div class="mb-4 mt-2">
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

  <div
    v-if="locationData.city && !isGeolocationError"
    class="my-8 text-xl lg:text-2xl"
  >
    📍 {{ locationData.city }}
  </div>

  <NetworkError v-if="isNetworkError" />

  <LocationError 
    v-if="isGeolocationError || isRouteLocationError"
    :errorType="isGeolocationError ? 'geolocation' : 'route'"
  />

  <LoadingStatus v-if="isLoading" />

  <WeatherConditions
    v-if="weatherData && !isNetworkError"
    :conditions="weatherData"
    :location="locationData"
    :units="weatherUnits"
  />

</template>
