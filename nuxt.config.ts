// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  modules: [
    "nuxt-icon",
    '@dargmuesli/nuxt-cookie-control',
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
