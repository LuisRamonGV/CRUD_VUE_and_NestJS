// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Cambia esta URL por la URL de tu API
  });

  nuxtApp.provide('axios', axiosInstance);
});
