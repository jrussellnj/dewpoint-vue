<script>
import dayjs from 'dayjs';

export default {
  name: 'DailyForecast',
  props: [ 
    // The daily weather conditions as returned by a call to the OpenWeather API
    'dailyConditions',

    // A method that returns a human-readable word and CSS class to describe the feeling of a dewpoint value
    'getComfortLevelInWords'
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
        Temperature: {{ day.temp.day }}&deg; &ndash; Conditions: {{ day.weather[0].main }}
      </div>
    </div>
  </div>
</template>
