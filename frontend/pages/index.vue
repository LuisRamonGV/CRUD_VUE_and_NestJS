<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-orange-500 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-white text-2xl font-bold mb-6 text-center">Registro</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-white text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-white text-sm font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Tu correo electrónico"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-white text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Tu contraseña"
              required
            />
          </div>
          <div>
            <label for="confirmPassword" class="block text-white text-sm font-medium mb-2">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Confirmar contraseña"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  function handleSubmit() {
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí iría el código para enviar los datos al servidor
    alert('Registro exitoso');
  }
  </script>
  
  