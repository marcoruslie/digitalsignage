<template>
  <!-- INPUT URL -->
  <input class="border w-96" v-model="postUrl" @change="getImageUrlFromPost" placeholder="Enter Instagram Image URL" />
  <div>
    <div v-if="mediaUrl">
      <img :src="mediaUrl" alt="Instagram Image" />
      <button @click="downloadImage">Download</button>
    </div>
    <p v-else>Loading image...</p>
    <p>{{ responseDownload }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mediaUrl = ref('');
// post url
const postUrl = ref('');
// image url
const imageUrl = ref('');
const responseDownload = ref('');
// get image url
const getImageUrlFromPost = async () => {
  try {
    const extractImage = await $fetch('/api/downloadMedia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        url: postUrl.value,
      },
    });
    console.log(extractImage);
    // Fetch the image via your Nuxt API
    const response = await fetch(`/api/proxyImage?imageUrl=${encodeURIComponent(extractImage)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch the image.');
    }

    const imageBlob = await response.blob(); // Get the image as a Blob
    mediaUrl.value = URL.createObjectURL(imageBlob); // Convert to Object URL for display
  } catch (error) {
    console.error('Error loading image:', error);
  }
}
const downloadImage = async () => {
  try {
    const response = await $fetch('/api/downloadPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        postUrl: postUrl.value,
      },
    });
    responseDownload.value = response;
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}
onMounted(async () => {

});
</script>
