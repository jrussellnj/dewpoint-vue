<script>
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    RouterView,
    SiteFooter
  }
}
</script>

<template>
  <div class="mx-auto w-3/4	lg:w-2/3">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>
