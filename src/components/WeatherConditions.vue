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
    'location'
  ],
  methods: {
    getComfortLevelInWords(dewpoint, units = 'imperial') {
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
              min: 50.1,
              max: 60
            },
            c: {
              min: 11,
              max: 15.5
            }
          }
        },
        {
          text: 'Sticky',
          range: {
            f: {
              min: 60.1,
              max: 65
            },
            c: {
              min: -1000,
              max: 10
            }
          }
        },
        {
          text: 'Uncomfortable',
          range: {
            f: {
              min: 65.1,
              max: 70
            },
            c: {
              min: -1000,
              max: 10
            }
          }
        },
        {
          text: 'Oppressive',
          range: {
            f: {
              min: 70.1,
              max: 75,
            },
            c: {
              min: -1000,
              max: 10
            }
          }
        },
        {
          text: 'Severe Discomfort',
          range: {
            f: {
              min: 75.1,
              max: 1000
            },
            c: {
              min: -1000,
              max: 10
            }
          }
        }
      ];

      const foundTemp = 
        scale.filter((s) => (
          (units == 'imperial' && s.range.f.min <= dewpoint && s.range.f.max >= dewpoint) ||
          (units == 'metric' && s.range.c.min <= dewpoint && s.range.c.max >= dewpoint)
        ))[0];

      console.log(foundTemp);

      return {
        description: foundTemp.text,
        cssClass: 'comfort-level-' + foundTemp.text.toLowerCase().replace(/\s/, '-')
      }
    }
  }
}
</script>

<template>
    <div v-if="location.city">
      📍 {{ this.location.city }}
    </div>

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
