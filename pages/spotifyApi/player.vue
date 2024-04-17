<!-- pages/callback.vue -->
<template>
    <div>
        {{ resultToken }}
        <h1>Authorization successful!</h1>
        <button @click="showCode">SHOW CODE</button>
        <input type="text" v-model="searchQuery" @input="searchMusic">
        <ul>
            <li v-for="track in searchResults" :key="track.id" @click="playTrack(track)" class="cursor-pointer">
                {{ track.name }} - {{ track.artists.map(artist => artist.name).join(', ') }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const resultToken = ref([]);
const searchQuery = ref('');
const searchResults = ref([]);
const router = useRouter();
const route = useRoute();
let player;
let deviceId;
const { _getToken, searchTrack } = useSpotifyApi();
onMounted(async () => {
    resultToken.value = await _getToken(route.query.code)
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
        player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(resultToken.value['access_token']); },
            volume: 0.5
        });

        // Ready
        player.addListener('ready', async ({ device_id }) => {
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
})

const fetchTrack = async (trackId) => {
    try {
        const { body } = await spotifyApi.getTrack(trackId);
        return body;
    } catch (error) {
        console.error('Error fetching track:', error);
        return null;
    }
};
const showCode = () => {
    alert(route.query.code)
}
const playBackgroundMusic = async (trackId) => {
    const track = await fetchTrack(trackId);
    if (track) {
        console.log('Now playing:', track.name);
        // Play the track in the background
    }
};
const searchMusic = async () => {

    if (!searchQuery.value.trim()) return;

    try {
        const response = await searchTracks(searchQuery.value, spotifyApi.getAccessToken());
        searchResults.value = response.tracks.items;
    } catch (error) {
        console.error('Error searching tracks:', error);
    }
};
</script>