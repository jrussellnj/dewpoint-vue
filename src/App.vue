<script>
import axios from 'axios';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import WeatherConditions from './components/WeatherConditions.vue';


export default {
  name: 'App',
  components: {
    SiteHeader,
    WeatherConditions,
    SiteFooter
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
    }
  },
  methods: {
    // Retrieve the OpenWeather data via a call to an API proxy and obscures the API key so it's not exposed on the front end
    getWeatherData() {
      console.log("getting weather data", this.locationData);

      const apiUrl = `http://localhost:3000/weather/${this.locationData.latitude}/${this.locationData.longitude}/${this.weatherUnits}`;
      console.log(apiUrl);

      if (this.locationData.latitude && this.locationData.longitude) {
        axios
          .get(apiUrl)
          .then((response) => {
            this.weatherData = response.data;
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
        navigator.geolocation.getCurrentPosition((position) => {
          this.locationData = position.coords;
        })
      }
    }
  }
}
</script>

<template>
  <SiteHeader />

  <WeatherConditions
    v-if="weatherData"
    :conditions="weatherData"
  />

  <SiteFooter />
</template>

<style lang="scss">
.lora-400, h1, h2, h3 {
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
