import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
      key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
      libraries: 'places'
  },
}).mount('#app');
