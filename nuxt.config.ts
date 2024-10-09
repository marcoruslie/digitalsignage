// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // SET THE MAXIMUM SIZE OF THE REQUEST BODY
  // https://nuxt.com/docs/guide/directory-structure/nuxt.config#runtimeconfig
  runtimeConfig: {
    bodyParser: {
      sizeLimit: "400mb",
    },
  },
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
