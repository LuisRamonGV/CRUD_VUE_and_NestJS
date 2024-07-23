export default {
  css: ['@/assets/css/tailwind.css'],

  build: {
  },
  
  plugins: [
    '~/plugins/axios.js',
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  compatibilityDate: '2024-07-22'
};