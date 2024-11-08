<template>
  <div id="app">
    <LoadingPage v-if="showLoadingPage" @navigate-next="navigateNext" />
    <div v-else class="main-content">
      <h1>Welcome to the Main Page!</h1>
      <!-- Main app content goes here -->
    </div>
  </div>
</template>

<script>
import LoadingPage from "./components/LoadingPage.vue";

export default {
  components: {
    LoadingPage,
  },
  data() {
    return {
      showLoadingPage: true, // Controls the loading page display
    };
  },
  methods: {
    navigateNext() {
      this.showLoadingPage = false; // Hide the loading page, show main content
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>