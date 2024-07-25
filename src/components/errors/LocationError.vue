<script>
export default {
  name: 'LocationError',
  props: [ 'errorType' ]
}
</script>

<template>
  <div class="border border-yellow-300 bg-yellow-200 p-4">
    <div v-if="errorType == 'geolocation'">
      ⚠️ Error: Cannot geolocate you! Please either enable geolocation in your browser or enter a location manually.
    </div>

    <div v-if="errorType == 'route'">
      ⚠️ Error: Invalid latitude and longitude in URL
    </div>
  </div>
</template>