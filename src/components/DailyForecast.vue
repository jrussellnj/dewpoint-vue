<script>
export default {
  name: 'DailyForecast',
  props: [ 
    'dailyConditions',
    'getComfortLevelInWords'
  ]
}
</script>

<template>
  <h2> Daily Forecast</h2>

  <div v-if="dailyConditions">
    <div v-for="day in dailyConditions" :key="day.dt" :class="getComfortLevelInWords(day.dew_point).cssClass">
      {{Math.round(day.dew_point)}}&deg; &mdash; {{ this.getComfortLevelInWords(Math.round(day.dew_point)).description }}
    </div>
  </div>
</template>
