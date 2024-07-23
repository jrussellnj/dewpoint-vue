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
    'conditions',
    'location',
    'units'
  ],
  methods: {
    getComfortLevelInWords(dewpoint) {
      // Scale of comfort based on imperial and metric dewpoint degree values
      // See https://www.hengko.com/news/what-is-a-comfortable-dew-point/
      /*
      * Below 50°F (10°C): Very comfortable 
      * 50°F to 60°F (10°C to 15.5°C): Comfortable  
      * 60°F to 65°F (15.5°C to 18.3°C): Becoming "sticky" with more noticeable humidity 
      * 65°F to 70°F (18.3°C to 21.1°C): Uncomfortable and quite humid  
      * 70°F to 75°F (21.1°C to 23.9°C): Very uncomfortable and oppressive   
      * Above 75°F (23.9°C): Extremely uncomfortable, oppressive, and can be hazardous.
      */

      const scale = [
        {
          text: 'Comfortable',
          range: {
            f: {
              min: -1000,
              max: 50
            },
            c: {
              min: -1000,
              max: 10
            }
          }
        },
        {
          text: 'Noticeable',
          range: {
            f: {
              min: 50.00001,
              max: 60
            },
            c: {
              min: 10.1,
              max: 15.5
            }
          }
        },
        {
          text: 'Sticky',
          range: {
            f: {
              min: 60.00001,
              max: 65
            },
            c: {
              min: 15.6,
              max: 18.3
            }
          }
        },
        {
          text: 'Uncomfortable',
          range: {
            f: {
              min: 65.00001,
              max: 70
            },
            c: {
              min: 18.4,
              max: 21.1
            }
          }
        },
        {
          text: 'Oppressive',
          range: {
            f: {
              min: 70.00001,
              max: 75,
            },
            c: {
              min: 21.2,
              max: 23.9
            }
          }
        },
        {
          text: 'Severe Discomfort',
          range: {
            f: {
              min: 75.00001,
              max: 1000
            },
            c: {
              min: 24,
              max: 1000
            }
          }
        }
      ];

      const foundTemp = 
        scale.filter((s) => (
          (this.units == 'imperial' && s.range.f.min <= dewpoint && s.range.f.max >= dewpoint) ||
          (this.units == 'metric' && s.range.c.min <= dewpoint && s.range.c.max >= dewpoint)
        ))[0];

      return {
        description: foundTemp.text,
        cssClass: 'comfort-level-' + foundTemp.text.toLowerCase().replace(/\s/, '-')
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

  <div class="mt-3">
    <DailyForecast
      v-if="conditions.daily"
      :dailyConditions="conditions.daily"
      :getComfortLevelInWords="getComfortLevelInWords"
    />
  </div>
</template>

<style lang="scss">
$dewpointFeelingColors: (
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
      background-color: $hex;
    }
  }
}

.comfort-level {
  @include dewpoint-feeling-colors;
}
</style>
