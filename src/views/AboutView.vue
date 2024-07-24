<template>
  <button @click="$router.back()">⬅️ Back</button>

  <p>
    From <a href="https://www.weather.gov/arx/why_dewpoint_vs_humidity" class="underline">Weather.gov</a>:
  </p>
  <p>
    The dew point is the temperature the air needs to be cooled to (at constant pressure) in order to achieve a relative humidity (RH) of 100%. At this point the air cannot hold more water in the gas form. If the air were to be cooled even more, water vapor would have to come out of the atmosphere in the liquid form, usually as fog or precipitation.
  </p>
  <p>
    The higher the dew point rises, the greater the amount of moisture in the air. This directly affects how "comfortable" it will feel outside. Many times, relative humidity can be misleading. For example, a temperature of 30 and a dew point of 30 will give you a relative humidity of 100%, but a temperature of 80 and a dew point of 60 produces a relative humidity of 50%. It would feel much more "humid" on the 80 degree day with 50% relative humidity than on the 30 degree day with a 100% relative humidity. This is because of the higher dew point.
  </p>
<p>
  So if you want a real judge of just how "dry" or "humid" it will feel outside, look at the dew point instead of the RH. The higher the dew point, the muggier it will feel.
</p>
</template>

<style scoped>
p {
  margin: 1em 0;
}
</style>