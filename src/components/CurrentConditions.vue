<script>
export default {
  name: 'CurrentConditions',
  props: [
    // The weather conditions as returned by a call to the OpenWeather API
    'conditions',

    // A method that returns a human-readable word and CSS class to describe the feeling of a dewpoint value
    'getComfortLevelInWords'
  ],
  data() {
    return {
      roundedDewPoint: Math.round(this.conditions.dew_point) || 0
    }
  }
}
</script>

<template>
  <h2>Current conditions:</h2>

  <h3 v-if="conditions" :class="getComfortLevelInWords(roundedDewPoint).cssClass">
    {{ roundedDewPoint }}&deg; &mdash; {{ getComfortLevelInWords(roundedDewPoint).description }}
  </h3>
</template>
