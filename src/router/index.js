import { createRouter, createWebHistory } from 'vue-router';
import LoadingPage from '../components/LoadingPage.vue';
import LoginPage from '../components/LoginPage.vue';
import ConnectTonWallet from '../components/ConnectTonWallet.vue';

const routes = [
  {
    path: '/',
    name: 'LoadingPage',
    component: LoadingPage,
  },
  {
    path: '/login',
    name: 'LoginPage', // Ensure this matches the redirect target in LoadingPage
    component: LoginPage,
  },
  {
    path: '/connect-wallet',
    name: 'ConnectTonWallet',
    component: ConnectTonWallet,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
