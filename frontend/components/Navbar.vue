<template>
    <nav class="bg-gray-800 text-white p-4">
      <ul class="flex space-x-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }
  </script>
  