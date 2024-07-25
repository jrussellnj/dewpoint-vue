<script>
export default {
  name: 'CurrentConditions',
  props: [
    // The current weather conditions as returned by a call to the OpenWeather API
    'conditions',

    // A method that returns a human-readable word and CSS class to describe the feeling of a dewpoint value
    'getComfortLevelInWords',

    // Gets a fully URL for the weather icon based on the icon attribute in the weather data
    'getWeatherIcon'
  ]
}
</script>

<template>
  <h2>Right Now</h2>

  <div
    v-if="conditions" 
    :class="getComfortLevelInWords(Math.round(this.conditions.dew_point)).cssClass"
    class="p-4"
  >
    <div class="text-3xl">
      {{ Math.round(this.conditions.dew_point) }}&deg; &mdash; {{ getComfortLevelInWords(Math.round(this.conditions.dew_point)).description }}
    </div>

    <div>
      <img src="@/assets/thermometer.png" class="w-4 inline-block" /> {{ Math.round(this.conditions.temp) }}&deg; <img loading="lazy" :src="getWeatherIcon(this.conditions.weather[0].icon)" class="w-6 inline-block" /> {{ this.conditions.weather[0].main }}
    </div>
  </div>
</template>
