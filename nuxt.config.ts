// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // app:{
  //   head:{
  //     script:[{
  //       src: 'https://sdk.scdn.co/spotify-player.js'
  //     }]
  //   }
  // }
  modules: ["@nuxtjs/tailwindcss"],

  compatibilityDate: "2024-07-08",
  build: {
    transpile: ["jsonwebtoken"],
  },
});
