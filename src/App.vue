<script>
import axios from 'axios';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter
  },
  data() {
    return {
      locationData: {
        'latitude': '39.950802',
        'longitude': '-75.160118'
      },
      weatherData: {},
      weatherUnits: 'imperial'
    }
  },
  created() {
    this.getWeatherData();
  },
  methods: {
    getWeatherData() {
      console.log("getting weather data", this.locationData);

      const url = `http://localhost:3000/weather?latitude=${this.locationData.latitude}&longitude=${this.locationData.longitude}&units=${this.weatherUnits}`;
      console.log(url);
      if (Object.keys(this.locationData).length) {
        axios
          .get(url)
          .then((response) => {
            this.weatherData = response.data;
            console.log(this.weatherData);
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
  <SiteFooter />
</template>

<style>
.lora-400 {
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
