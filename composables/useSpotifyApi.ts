import type { Router } from "vue-router";

export default () => {
  
  const _getToken = async (code:any) => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + btoa('899c5104e19a41d9ba1f6d305e5c497f:2bc8bcd4fc754953a32bd5efec8800f1')
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/spotifyApi/player",
      }),
    });
    
    return response.json();
  };
  const searchTracks = async (query: string, accessToken:string) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }
    return await response.json();
  };
  
  return {
    _getToken,
    searchTracks
  };
};
