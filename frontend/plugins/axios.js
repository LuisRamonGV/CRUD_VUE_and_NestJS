import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // URL API
    headers: {
      'Content-Type': 'application/json',
    },
  });

  nuxtApp.provide('axios', axiosInstance);
});
