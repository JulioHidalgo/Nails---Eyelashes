import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue'),
      props: true
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/ReservasView.vue'),
      props: true
    }
  ]
})

export default router

