import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue'),
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue'),
    },
  ],
})

export default router
