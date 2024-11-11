<template>
  <div class="loading-page" @click="handleScreenClick">
    <!-- Video Background -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="/videos/videoplayback1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Instagram-style Segmented Progress Bar -->
    <div class="progress-bar">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="progress-segment"
      >
        <div
          class="progress-fill"
          :style="{ width: index < currentSlide ? '100%' : progressWidth }"
        ></div>
      </div>
    </div>

    <!-- Slide Content with Transition -->
    <transition name="fade-slide" mode="out-in">
      <div :key="currentSlide" class="slide-content text-center">
        <p class="text-gray-400 text-sm">{{ slides[currentSlide].title }}</p>
        <h1 class="tracking-tighter text-4xl md:text-5xl font-black">
          {{ slides[currentSlide].mainText }}
        </h1>
        <p class="text-lg text-gray-300">{{ slides[currentSlide].subText }}</p>
        <div class="flex items-center justify-center mt-4">
          <img :src="slides[currentSlide].flagIcon" alt="Flag Icon" class="h-16 w-16" />
        </div>
        <p class="text-lg text-gray-300 mt-4">{{ slides[currentSlide].usersText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { authState } from '../auth';

export default {
  data() {
    return {
      currentSlide: 0,
      progressWidth: "0%", // Tracks the fill width for the current segment
      slides: [
        { title: "QUANTUM BEGINNINGS", mainText: "DISCOVER THE UNSEEN", subText: "THE MINI APP WITH THE POWER OF QUANTUM POTENTIAL", flagIcon: "/path/to/quantum-icon-1.png", usersText: "TOTAL QUANTUM USERS: 10,000,000" },
        { title: "ENTANGLEMENT ERA", mainText: "CONNECTED ACROSS REALMS", subText: "SEE HOW MANY USERS ARE JOINING FORCES", flagIcon: "/path/to/quantum-icon-2.png", usersText: "TOTAL USERS IN ENTANGLEMENT: 25,000,000" },
        { title: "QUANTUM LEAP ERA", mainText: "GOING BEYOND LIMITS", subText: "UNLOCK THE HIGHEST REWARD PER TAP", flagIcon: "/path/to/quantum-icon-3.png", usersText: "TOTAL LEAPERS: 55,000,000" },
        { title: "SUPERPOSITION MASTERS", mainText: "BALANCING POSSIBILITIES", subText: "BECOME A MASTER IN THE QUANTUM FIELD", flagIcon: "/path/to/quantum-icon-4.png", usersText: "TOTAL MASTERS: 80,000,000" },
        { title: "QUANTUM FUTURE", mainText: "STEP INTO TOMORROW", subText: "JOIN THE LEADING EDGE OF MINI APP INNOVATION", flagIcon: "/path/to/quantum-icon-5.png", usersText: "GLOBAL QUANTUM COMMUNITY: 120,000,000" }
      ],
      SLIDE_DURATION: 3000, // Duration per slide in ms
      interval: null,
    };
  },
  mounted() {
    console.log("Mounted LoadingPage");
    console.log("authState.isLoggedIn:", authState.isLoggedIn);

    // Check login state and redirect accordingly
    if (authState.isLoggedIn) {
      console.log("User is already logged in, redirecting to ConnectTonWallet");
      this.$router.push({ name: "ConnectTonWallet" });
    } else {
      console.log("User is not logged in, starting auto slide");
      this.startAutoSlide();
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    startAutoSlide() {
      const segmentDuration = this.SLIDE_DURATION;

      this.interval = setInterval(() => {
        this.progressWidth = "100%";

        setTimeout(() => {
          if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.progressWidth = "0%"; // Reset for next segment
          } else {
            clearInterval(this.interval);
            this.redirectAfterSlides();
          }
        }, segmentDuration);
      }, segmentDuration);
    },
    redirectAfterSlides() {
      if (authState.isLoggedIn) {
        console.log("Slides finished, user is logged in. Redirecting to ConnectTonWallet");
        this.$router.push({ name: "ConnectTonWallet" });
      } else {
        console.log("Slides finished, user is not logged in. Redirecting to LoginPage");
        this.$router.push({ name: "LoginPage" });
      }
    },
    handleScreenClick(event) {
      const screenWidth = window.innerWidth;
      const clickPosition = event.clientX;
      clearInterval(this.interval);
      if (clickPosition > screenWidth / 2) {
        this.goToNextSlide();
      } else {
        this.goToPreviousSlide();
      }
      this.startAutoSlide();
    },
    goToPreviousSlide() {
      this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.slides.length - 1;
      this.progressWidth = "0%"; // Reset for previous segment
    },
  },
};
</script>

<style scoped>
.loading-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: white;
  overflow: hidden;
  position: relative;
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

/* Instagram-style Segmented Progress Bar */
.progress-bar {
  position: absolute;
  top: 10px;
  left: 5%;
  width: 90%;
  height: 4px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.progress-segment {
  flex: 1;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 4px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #ffffff;
  transition: width 3s linear;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-content {
  text-align: center;
  z-index: 1;
}

.text-gray-400 {
  color: #a0aec0;
}

.text-gray-300 {
  color: #cbd5e0;
}

.text-4xl {
  font-size: 2.25rem;
}

.md\:text-5xl {
  font-size: 3rem;
}

.font-black {
  font-weight: 900;
}

.tracking-tighter {
  letter-spacing: -0.05em;
}
</style>
