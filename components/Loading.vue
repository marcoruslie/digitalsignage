<template>
    <div class="loader" v-if="loading">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Loading...',
    },
  });
  </script>
  
  <style scoped>
  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #001f28; /* OnPrimaryContainer */
    font-size: 18px;
    z-index: 9999;
  }
  
  .spinner {
    border: 4px solid #b8eaff; /* PrimaryContainer */
    border-radius: 50%;
    border-top: 4px solid #006780; /* Primary */
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  p {
    margin-top: 10px;
    color: #006780; /* Primary */
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  