<template>
  <nav class="bg-orange-500 p-4 fixed top-0 left-64 right-0 z-10">
    <div class="flex justify-between items-center mx-auto max-w-7xl">
      <div class="flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white">Home</a>
        <a href="#" class="text-gray-300 hover:text-white">Profile</a>
        <a href="#" class="text-gray-300 hover:text-white">Settings</a>
      </div>
      <div>
        <button @click="logout" class="text-gray-300 hover:text-white">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  const isConfirmed = confirm('¿Seguro que desea salir?');

  if (isConfirmed) {
    router.push('/');
  }
}
</script>
