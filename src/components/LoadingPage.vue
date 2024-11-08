<template>
  <div class="loading-page">
    <!-- Animated Element (e.g., a spinning loader) -->
    <div class="loader" v-if="!isLoaded"></div>

    <!-- Next Button -->
    <button v-if="isLoaded" @click="goToNextPage" class="next-button">
      Next
    </button>
  </div>
</template>

<script>
export default {
  watch: {
  },
  data() {
    return {
      isLoaded: false, // Tracks if the loading animation is complete
    };
  },
  mounted() {
    // Simulate a loading time before showing the "Next" button
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000); // Adjust the time as needed (in milliseconds)
  },
  methods: {
    goToNextPage() {
      this.$emit('navigate-next'); // Emit an event to parent to handle page transition
    },
  },
};
</script>

<style scoped>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.loader {
  width: 60px;
  height: 60px;
  border: 8px solid #ccc;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.next-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.next-button:hover {
  background-color: #3a9d78;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>