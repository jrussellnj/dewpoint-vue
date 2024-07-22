<script>
import CurrentConditions from './CurrentConditions.vue';
import DailyForecast from './DailyForecast.vue';

export default {
  name: 'WeatherConditions',
  components: {
    CurrentConditions,
    DailyForecast
  },
  props: [
    'conditions'
  ],
  methods: {
    getComfortLevelInWords(dewpoint) {
      let humanReadableComfortLevel;

      if (dewpoint > 70) {
        humanReadableComfortLevel = "Oppressive";
      }

      return {
        description: humanReadableComfortLevel,
        cssClass: 'comfort-level-' + humanReadableComfortLevel.toLowerCase()
      }
    }
  }
}
</script>

<template>
    <CurrentConditions 
    v-if="conditions.current"
    :conditions="conditions.current" 
    :getComfortLevelInWords="getComfortLevelInWords"
  />

  <DailyForecast
    v-if="conditions.daily"
    :dailyConditions="conditions.daily"
    :getComfortLevelInWords="getComfortLevelInWords"
  />
</template>

<style lang="scss">
$dewpointFeelingColors: (
  pleasant: #C3E4A8,
  comfortable: #C3E4A8,
  noticeable: #82D4A5,
  sticky: #FDFD9D,
  uncomfortable: #FCDC94,
  oppressive: #FC7B82,
  severe-discomfort: #DA777D
);

@mixin dewpoint-feeling-colors {
  @each $name, $hex in $dewpointFeelingColors {
    &-#{$name} {
      color: $hex;
    }
  }
}

.comfort-level {
  @include dewpoint-feeling-colors;
}
</style>
