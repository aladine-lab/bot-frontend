<template>
  <div class="login-page">
    <h1>Login with Telegram</h1>
    <div id="telegram-login-button" class="login-button"></div>
  </div>
</template>

<script>
import { login } from '../auth';  // Import the login function from auth.js

export default {
  name: "LoginPage",
  mounted() {
    this.loadTelegramLogin();
  },
  methods: {
    loadTelegramLogin() {
      const botUsername = "investzhbot"; // Replace with your bot's username
      const authUrl = "https://b955-105-103-214-14.ngrok-free.app"; // Replace with your actual domain or ngrok URL

      const script = document.createElement("script");
      script.src = `https://telegram.org/js/telegram-widget.js?${botUsername}`;
      script.async = true;
      script.setAttribute("data-telegram-login", botUsername);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "5");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-auth-url", authUrl);
      script.setAttribute("data-on-auth", "onTelegramAuth");
      document.getElementById("telegram-login-button").appendChild(script);
    },
    onTelegramAuth(user) {
      console.log("Telegram user authenticated:", user);

      // Update the login state using the login function from auth.js
      login(user);

      // Navigate to ConnectTonWallet page after successful login
      this.$router.push({ name: "ConnectTonWallet" });
    },
  },
  mounted() {
    // Attach onTelegramAuth to the global window object
    window.onTelegramAuth = this.onTelegramAuth.bind(this);
    this.loadTelegramLogin();
  }
};
</script>
