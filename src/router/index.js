import { createRouter, createWebHistory } from 'vue-router'
import LoadingPage from '../components/LoadingPage.vue'

const routes = [
  {
    path: '/',
    name: 'LoadingPage',
    component: LoadingPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
