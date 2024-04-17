// services/spotify.js
import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi({
  clientId: '899c5104e19a41d9ba1f6d305e5c497f',
  clientSecret: '2bc8bcd4fc754953a32bd5efec8800f1',
  redirectUri: 'http://localhost:3000/spotifyApi/player'
});

export default spotifyApi;