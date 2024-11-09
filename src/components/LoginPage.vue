<template>
    <div class="login-page">
      <h1>Login with Telegram</h1>
      <!-- Telegram Login Button -->
      <div id="telegram-login-button"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    mounted() {
      this.loadTelegramLogin();
    },
    methods: {
      loadTelegramLogin() {
        // Set your bot's username here
        const botUsername = "frontestbot"; // Replace with your actual bot username
  
        // Load Telegram login widget
        window.TelegramLoginWidget = {
          dataOnAuth: (user) => this.onTelegramAuth(user),
        };
  
        const script = document.createElement("script");
        script.src = `https://telegram.org/js/telegram-widget.js?${botUsername}`;
        script.async = true;
        script.setAttribute("data-telegram-login", botUsername);
        script.setAttribute("data-size", "large");
        script.setAttribute("data-radius", "5");
        script.setAttribute("data-request-access", "write"); // Access level required
        script.setAttribute("data-userpic", "true");
        script.setAttribute("data-auth-url", ""); // Leave empty for client-side login
        document.getElementById("telegram-login-button").appendChild(script);
      },
      onTelegramAuth(user) {
        console.log("Telegram user data:", user);
        // Handle user data, e.g., save it to state or redirect to another page
        this.$emit("login-success", user); // Emit user data to parent or handle login success
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  #telegram-login-button {
    margin-top: 20px;
  }
  </style>