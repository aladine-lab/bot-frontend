<template>
  <div class="loading-page">
    <!-- Video Background -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="/videos/videoplayback.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Presentation Text with Typing Effect -->
    <div class="typing-container">
      <p class="typing-text">Welcome to 
          Quantum Universe</p>
    </div>

    <!-- "Next" Button at the Bottom of the Page -->
    <button v-if="isLoaded" @click="goToNextPage" class="next-button">
      Next
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    // Simulate loading delay before showing "Next" button
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);
  },
  methods: {
    goToNextPage() {
      this.$emit("navigate-next");
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  color: white;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}

/* Typing Animation Styles */
.typing-container {
  position: relative;
  z-index: 1;
  font-size: 28px;
  color: white;
  margin-bottom: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid rgba(255, 255, 255, 0.75); /* Blinking cursor */
  width: 0; /* Start width at 0 to animate text in */
  animation: typing 6s steps(30, end), blink-caret 0.75s step-end infinite;
}

.typing-text {
  display: inline;
  white-space: nowrap;
}

/* Keyframes for typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%; /* Expands the width to reveal the entire text */
  }
}

/* Keyframes for blinking cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgba(255, 255, 255, 0.75);
  }
}

/* Style for the "Next" button */
.next-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1e3a8a; /* Dark blue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1;
}

.next-button:hover {
  background-color: #162b5d; /* Darker blue on hover */
}
</style>