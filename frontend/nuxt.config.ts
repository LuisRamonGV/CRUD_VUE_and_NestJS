export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],

  build: {
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  compatibilityDate: '2024-07-22'
});