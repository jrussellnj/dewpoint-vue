import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue';
import router from './router/index.js';
import App from './App.vue';
import './index.css';

const app = createApp(App);

app
  .use(router)
  .use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
        libraries: 'places'
    },
  })
  .mount('#app');
