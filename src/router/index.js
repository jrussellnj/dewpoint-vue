import { createRouter, createWebHistory  } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
  { path: '/:lat?/:lng?', component: HomeView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;