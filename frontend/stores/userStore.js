import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('/auth/profile')
        this.user = response.data
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error)
      }
    },
  },
})
