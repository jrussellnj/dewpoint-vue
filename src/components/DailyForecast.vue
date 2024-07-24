<script>
import dayjs from 'dayjs';

export default {
  name: 'DailyForecast',
  props: [ 
    // The daily weather conditions as returned by a call to the OpenWeather API
    'dailyConditions',

    // A method that returns a human-readable word and CSS class to describe the feeling of a dewpoint value
    'getComfortLevelInWords',

    // Gets a fully URL for the weather icon based on the icon attribute in the weather data
    'getWeatherIcon'
  ],
  methods: {
    // Turn the unix timestamp provided by OpenWeather into a human readable date
    parseTimestamp(unixTimestamp, formatPattern) {
      return dayjs.unix(unixTimestamp).format(formatPattern);
    }
  }
}
</script>

<template>
  <h2> Daily Forecast</h2>

  <div v-if="dailyConditions">
    <div 
      v-for="day in dailyConditions" 
      :class="getComfortLevelInWords(day.dew_point).cssClass"
      :key="day.dt"
      class="my-2 p-3"
    >
      <div class="text-xl">
        <div>
          {{ this.parseTimestamp(day.dt, 'dddd, MMM D') }}
        </div>

        <div>
          {{Math.round(day.dew_point)}}&deg; &mdash; {{ this.getComfortLevelInWords(Math.round(day.dew_point)).description }}
        </div>
      </div>

      <div>
        <img src="@/assets/thermometer.png" class="w-4 inline-block" /> {{ Math.round(day.temp.day) }}&deg; <img loading="lazy" :src="getWeatherIcon(day.weather[0].icon)" class="w-6 inline-block" /> {{ day.weather[0].main }}
      </div>
    </div>
  </div>
</template>
