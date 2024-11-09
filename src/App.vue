<template>
  <div id="app">
    <LoadingPage v-if="showLoadingPage" @navigate-next="showLoginPage" />
    <LoginPage v-else @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
import LoadingPage from "./components/LoadingPage.vue";
import LoginPage from "./components/LoginPage.vue";

export default {
  components: {
    LoadingPage,
    LoginPage,
  },
  data() {
    return {
      showLoadingPage: true, // Initially shows loading page
      user: null, // Store logged-in user data
    };
  },
  methods: {
    showLoginPage() {
      this.showLoadingPage = false; // Switch to LoginPage
    },
    handleLoginSuccess(user) {
      this.user = user; // Store user data from Telegram login
      console.log("User logged in:", user);
      // Handle navigation or any other action after login
    },
  },
};
</script>