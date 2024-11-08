<template>
  <div class="loading-page">
    <!-- Video Background -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="/videos/videoplayback.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Loading Message -->
    <div class="loading-content" v-if="!isLoaded">
      <p>Loading...</p> <!-- Replace this with a spinner or logo if desired -->
    </div>

    <!-- "Next" Button -->
    <button v-if="isLoaded" @click="goToNextPage" class="next-button">
      Next
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false, // Tracks if loading has completed
    };
  },
  mounted() {
    // Simulate loading delay before showing "Next" button
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000); // Adjust delay as needed (milliseconds)
  },
  methods: {
    goToNextPage() {
      this.$emit("navigate-next"); // Emit event to parent for page transition
    },
  },
};
</script>

<style scoped>
.loading-page {
  /* position: absolute; */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures video covers the background */
  z-index: -1; /* Places video behind other content */
  pointer-events: none; /* Disable interactions with the video */
}

.loading-content {
  position: relative;
  z-index: 1; /* Ensure it's above the video */
  font-size: 24px;
  font-weight: bold;
}

.next-button {
  position: relative;
  z-index: 1; /* Ensure it's above the video */
  /* margin-top: 20px; */
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
</style>