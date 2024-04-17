<!-- pages/login.vue -->
<template>
    <div>
        <h2>Login with Spotify</h2>
        <button @click="login" class="bg-slate-300 shadow-2xl rounded-md p-1">Login with Spotify</button>
    </div>
</template>

<script setup>
const login = () => {

    const client_id = '899c5104e19a41d9ba1f6d305e5c497f';
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        redirect_uri: 'http://localhost:3000/spotifyApi/player',
        scope: scope,
        state: state
    });

    const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

    try {
        // Redirect the user to the Spotify authorization endpoint
        window.location.href = authUrl;
    } catch (error) {
        console.error('Error redirecting to Spotify authorization endpoint:', error);
    }
}
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
</script>