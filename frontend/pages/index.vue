<template>
  <div class="relative flex items-center justify-center min-h-screen bg-gray-100 rem-7">
    <!-- Bars -->
    <div class="absolute top-0 left-0 w-full h-12 bg-slate-800"></div>
    <div class="absolute bottom-0 left-0 w-full h-20 bg-slate-800"></div>

    <div class="relative bg-orange-500 p-8 rounded-lg shadow-inner-custom w-full max-w-[25%] flex flex-col justify-end min-h-[75vh] max-w-[25rem]">
      <!-- Icon -->
      <div class="absolute min-h-[500px] left-1/2 transform -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12">
          <path fill-rule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <h1 class="text-white text-2xl font-semibold mb-6 text-center">Registro</h1>
      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mb-4">
          <label for="name" class="block text-white">Nombre</label>
          <input id="name" type="text" v-model="form.name"
            class="w-full p-2 mt-1 border border-gray-300 rounded-lg" placeholder="Nombre" required />
          <p v-if="formErrors.name" class="text-black-500 text-sm mt-1">{{ formErrors.name }}</p>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-white">Correo</label>
          <input id="email" type="email" v-model="form.email"
            class="w-full p-2 mt-1 border border-gray-300 rounded-lg" placeholder="Correo electrónico" required />
          <p v-if="formErrors.email" class="text-black-500 text-sm mt-1">{{ formErrors.email }}</p>
        </div>
        <div class="mb-4 relative">
          <label for="password" class="block text-white">Contraseña</label>
          <input id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password"
            class="w-full p-2 mt-1 border border-gray-300 rounded-lg" placeholder="Contraseña" required />
          <button type="button" @click="togglePasswordVisibility"
            class="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none">
            <span v-if="showPassword">👁️</span>
            <span v-else>🙈</span>
          </button>
          <p v-if="formErrors.password" class="text-black-500 text-sm mt-1">{{ formErrors.password }}</p>
        </div>
        <div class="mb-4 relative">
          <label for="confirm-password" class="block text-white">Confirmar Contraseña</label>
          <input id="confirm-password" :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.confirmPassword" class="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Confirmar contraseña" required />
          <button type="button" @click="toggleConfirmPasswordVisibility"
            class="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none">
            <span v-if="showConfirmPassword">👁️</span>
            <span v-else>🙈</span>
          </button>
          <p v-if="formErrors.confirmPassword" class="text-black-500 text-sm mt-1">{{ formErrors.confirmPassword }}</p>
        </div>
        <button type="submit"
          class="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Registrar
        </button>
        <p v-if="successMessage" class="text-green-500 text-sm mt-4">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-4">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formErrors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const successMessage = ref('');
const errorMessage = ref('');

const { $axios } = useNuxtApp();

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

function validateForm() {
  let valid = true;
  formErrors.value = { name: '', email: '', password: '', confirmPassword: '' };

  if (!/^[a-zA-Z\s]{5,}$/.test(form.value.name)) {
    formErrors.value.name = 'Nombre debe tener al menos 5 letras y no debe contener numeros ni símbolos.';
    valid = false;
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.value.email)) {
    formErrors.value.email = 'Ingrese un correo electronico valido.';
    valid = false;
  }
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,15}$/.test(form.value.password)) {
    formErrors.value.password = 'Contraseña debe tener entre 10 y 15 caracteres, al menos una mayúscula, un número y un símbolo.';
    valid = false;
  }
  if (form.value.password !== form.value.confirmPassword) {
    formErrors.value.confirmPassword = 'Las contraseñas no coinciden.';
    valid = false;
  }

  return valid;
}

async function handleSubmit() {
  successMessage.value = '';
  errorMessage.value = '';
  
  if (validateForm()) {
    try {
      const response = await $axios.post('/users', form.value);
       successMessage.value = 'Registro exitoso';
      console.log('Registro exitoso', response.data);
    } catch (error) {
      errorMessage.value = 'Error en el registro: ' + (error.response?.data?.message || error.message);
      console.error('Error en el registro', error);
    }
  }
}
</script>
