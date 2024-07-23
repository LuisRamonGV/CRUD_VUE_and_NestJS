<template>
    <div class="p-4">
      <!-- Botón para Mostrar/Ocultar Formulario de Agregar Usuario -->
      <button @click="toggleForm" class="bg-blue-500 text-white p-2 rounded mb-4">
        {{ showForm ? 'Cancelar' : 'Agregar Nuevo Usuario' }}
      </button>
  
      <!-- Formulario de Registro -->
      <div v-if="showForm" class="mb-4">
        <!-- ... (Formulario de Agregar Usuario) ... -->
      </div>
  
      <!-- Tabla de Usuarios -->
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="px-4 py-2 text-left">ID</th>
            <th class="px-4 py-2 text-left">Nombre</th>
            <th class="px-4 py-2 text-left">Correo</th>
            <th class="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="px-4 py-2">{{ user.id }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">
              <button @click="startEdit(user)" class="bg-yellow-500 text-white p-1 rounded">Editar</button>
              <button @click="deleteUser(user.id)" class="bg-red-500 text-white p-1 rounded ml-2">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Paginación -->
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-500 text-white p-2 rounded">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-500 text-white p-2 rounded">Siguiente</button>
      </div>
  
      <!-- Modal de Edición -->
      <div v-if="showEditModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg w-1/3">
          <!-- ... (Formulario de Edición) ... -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useNuxtApp } from '#app';
  
  const { $axios } = useNuxtApp();
  
  const users = ref([]);
  const newUser = ref({
    name: '',
    email: '',
    password: '',
  });
  const confirmPassword = ref('');
  const editUser = ref({
    id: null,
    name: '',
    email: '',
  });
  const showForm = ref(false);
  const showEditModal = ref(false);
  const showPassword = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  const fetchUsers = async (page = 1) => {
    try {
      const response = await $axios.get('/users', { params: { page, limit: itemsPerPage } });
      users.value = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));
  
  const addUser = async () => {
    if (!isFormValid) return;
    
    try {
      await $axios.post('/users', newUser.value);
      newUser.value = { name: '', email: '', password: '' }; // Reset form
      confirmPassword.value = ''; // Reset confirm password
      showForm.value = false; // Hide form
      await fetchUsers(currentPage.value); // Refresh user list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await $axios.delete(`/users/${id}`);
      await fetchUsers(currentPage.value); // Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const startEdit = (user) => {
    editUser.value = { ...user };
    showEditModal.value = true;
  };
  
  const updateUser = async () => {
    if (!isValidEditForm) return;
  
    try {
      await $axios.put(`/users/${editUser.value.id}`, editUser.value);
      showEditModal.value = false; // Hide modal
      await fetchUsers(currentPage.value); // Refresh user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const closeEditModal = () => {
    showEditModal.value = false;
  };
  
  // Computed Properties for Validations
  const isValidName = computed(() => /^[a-zA-Z]{5,}$/.test(newUser.value.name));
  const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.value.email));
  const isValidPassword = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,15}$/.test(newUser.value.password));
  const isPasswordsMatch = computed(() => newUser.value.password === confirmPassword.value);
  const isFormValid = computed(() => isValidName.value && isValidEmail.value && isValidPassword.value && isPasswordsMatch.value);
  
  const isValidEditName = computed(() => /^[a-zA-Z]{5,}$/.test(editUser.value.name));
  const isValidEditEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.value.email));
  const isValidEditForm = computed(() => isValidEditName.value && isValidEditEmail.value);
  
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
      fetchUsers(currentPage.value);
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
      fetchUsers(currentPage.value);
    }
  };
  
  onMounted(() => {
    fetchUsers(currentPage.value);
  });
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  