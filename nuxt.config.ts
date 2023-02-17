// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "nuxt-icon",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore", // import { defineStore } from 'pinia'
        ],
      },
    ],
  ],
  css: ["@/assets/css/global.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
});
