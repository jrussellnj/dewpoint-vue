<script>
export default {
  name: 'CurrentConditions',
  props: [
    // The current weather conditions as returned by a call to the OpenWeather API
    'conditions',

    // A method that returns a human-readable word and CSS class to describe the feeling of a dewpoint value
    'getComfortLevelInWords'
  ]
}
</script>

<template>
  <h2>Current conditions:</h2>

  <div
    v-if="conditions" 
    :class="getComfortLevelInWords(Math.round(this.conditions.dew_point)).cssClass"
  >
    {{ Math.round(this.conditions.dew_point) }}&deg; &mdash; {{ getComfortLevelInWords(Math.round(this.conditions.dew_point)).description }}
  </div>
</template>
