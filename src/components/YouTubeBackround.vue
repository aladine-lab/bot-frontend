<template>
    <div class="youtube-background">
      <!-- YouTube Iframe -->
      <iframe
        class="background-video"
        :src="videoUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <!-- Slot for overlay content -->
      <div class="overlay-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      videoId: {
        type: String,
        required: true,
      },
    },
    computed: {
      videoUrl() {
        return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${this.videoId}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .youtube-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
  }
  
  .background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%);
    pointer-events: none; /* Disable interaction with the video */
  }
  
  .overlay-content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  </style>