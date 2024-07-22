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
    <div v-for="day in dailyConditions" :key="day.dt">
      {{day.dew_point}}&deg;
    </div>
  </div>
</template>
