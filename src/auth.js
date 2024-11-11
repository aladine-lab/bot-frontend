// src/auth.js
import { reactive } from 'vue';

export const authState = reactive({
  isLoggedIn: false,
  user: null,
});

export function login(user) {
  authState.isLoggedIn = true;
  authState.user = user;
}

export function logout() {
  authState.isLoggedIn = false;
  authState.user = null;
}
