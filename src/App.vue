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
      locationData: {
        'latitude': '39.950802',
        'longitude': '-75.160118'
      },

      // The weather data will live here when the OpenWeather API call returns
      weatherData: {},

      // The default weather units will be imperial/US units, but can change to metric
      weatherUnits: 'imperial'
    }
  },
  created() {
    // Kick off weather data retrieval as soon as the app is created
    this.getWeatherData();
  },
  methods: {
    // Retrieve the OpenWeather data via a call to an API proxy and obscures the API key so it's not exposed on the front end
    getWeatherData() {
      console.log("getting weather data", this.locationData);

      const apiUrl = `http://localhost:3000/weather/${this.locationData.latitude}/${this.locationData.longitude}/${this.weatherUnits}`;
      console.log(apiUrl);

      if (Object.keys(this.locationData).length) {
        axios
          .get(apiUrl)
          .then((response) => {
            this.weatherData = response.data;
          });
      }
      else {
        console.log("No location!");
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
