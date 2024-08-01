<template>
  <div>
    <h1>Youtube API</h1>
    <input type="text" v-model="searchQuery" @input="searchMusic">
    <ul>
      <li v-for="track in searchResults" :key="track.id" @click="playTrack(track)" class="cursor-pointer">
        {{ track.name }} - {{ track.artists.map(artist => artist.name).join(', ') }}
      </li>
    </ul>
  </div>
  {{ getToken }}


</template>

<script setup>
const { _getToken, searchTracks } = useSpotifyApi();
const getToken = ref('');
const searchQuery = ref('');
const searchResults = ref([]);
let player;
let deviceId;
const token = "BQBzNhOYpKvBvVZbA-KyQS6Q-ZLhGDmNYGpwusMjMRcxgr38xZ1UFsG5Wqcz9x0keQaMErAu4VnGV0j-45iBfRNnfkPAk4a4GUVCELxRaN_aZpH4Ao7c_-KS8aNRBByaKyqWXXRMIO3atoPribHctFKhiC3uDzccMYu3QHPYw_ODLGta9-Sp0BqI8VNSiqhYwFkywc8VeUqBp6D3h-YfIvjWRZkH"
onMounted(async () => {
  getToken.value = await _getToken();
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  document.body.appendChild(script);
  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    // Ready
    player.addListener('ready',async ({ device_id }) => {
      deviceId = device_id;
      console.log('Ready with Device ID', device_id);
      await playTrack({
        uri: 'spotify:track:5BqKtuCFLfZyzfZOwlgW1f'
      });
    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error('Failed to initialize player:', message);
    });
    player.addListener('authentication_error', ({ message }) => {
      console.error('Failed to authenticate player:', message);
    });
    player.addListener('account_error', ({ message }) => {
      console.error('Failed to validate Spotify account:', message);
    });
    player.addListener('playback_error', ({ message }) => {
      console.error('Failed to perform playback:', message);
    });

    // Connect to Spotify
    player.connect();

  };
  // playSpotifyTrack();
});
const searchMusic = async () => {
  if (!searchQuery.value.trim()) return;

  try {
    const response = await searchTracks(searchQuery.value, getToken.value['access_token']);
    searchResults.value = response.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error);
  }
};
const playTrack = async (track) => {
  if (!player || !deviceId) {
    console.error('Player is not initialized or no device ID available');
    return;
  }
  try {
    const playResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: [track.uri] // Pass the track URI
      })
    });
    console.log(playResponse)
    console.log(track.uri)
  } catch (error) {
    console.error('Error playing track:', error);
  }
};
</script>