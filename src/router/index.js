import { createRouter, createWebHistory } from 'vue-router'
import LoadingPage from '../components/LoadingPage.vue'
import YouTubeBackround from '../components/YouTubeBackround.vue'

const routes = [
  {
    path: '/',
    name: 'LoadingPage',
    component: LoadingPage
  },
  {
    path: '/',
    name: 'YouTubeBackround',
    component: YouTubeBackround
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
