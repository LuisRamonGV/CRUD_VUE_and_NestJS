<<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <!-- Add New User Button-->
      <button @click="toggleForm" class="bg-blue-500 text-white p-2 rounded">
        {{ showForm ? 'Cancelar' : 'Agregar Nuevo Usuario' }}
      </button>

      <!-- Search Field -->
      <input v-model="searchQuery" type="text" placeholder="Buscar usuario por nombre o correo" class="w-1/4 p-2 border border-gray-300 rounded" />
    </div>
  
      <!-- Modal Register New user -->
      <div v-if="showForm" class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Agregar Nuevo Usuario</h2>
        <form @submit.prevent="addUser">
          <div class="mb-4">
            <label class="block text-gray-700">Nombre</label>
            <input v-model="newUser.name" type="text" class="w-full p-2 border border-gray-300 rounded" required />
            <p v-if="!isValidName" class="text-red-500 text-sm">El nombre debe tener más de 4 letras y solo contener caracteres.</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Correo Electrónico</label>
            <input v-model="newUser.email" type="email" class="w-full p-2 border border-gray-300 rounded" required />
            <p v-if="!isValidEmail" class="text-red-500 text-sm">Correo electrónico inválido.</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Contraseña</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="newUser.password" class="w-full p-2 border border-gray-300 rounded" required />
            <button type="button" @click="togglePassword" class="text-blue-500 ml-2">{{ showPassword ? 'Ocultar' : 'Mostrar' }}</button>
            <p v-if="!isValidPassword" class="text-red-500 text-sm">
                La contraseña debe tener:
                <br>
                - Entre 10 y 15 caracteres
                <br>
                - Incluir al menos una mayúscula
                <br>
                - Incluir al menos un número
                <br>
                - Incluir al menos un símbolo</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Verificación de Contraseña</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" class="w-full p-2 border border-gray-300 rounded" required />
            <p v-if="!isPasswordsMatch" class="text-red-500 text-sm">Las contraseñas no coinciden.</p>
          </div>
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">Agregar Usuario</button>
        </form>
      </div>
  
      <!-- Users Table -->
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
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-4 py-2">{{ user.id }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">
              <button @click="startEdit(user)" class="bg-yellow-500 text-white p-1 rounded">Editar</button>
              <button @click="openConfirmDialog(user.id)" class="bg-red-500 text-white p-1 rounded ml-2">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-500 text-white p-2 rounded">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-500 text-white p-2 rounded">Siguiente</button>
      </div>
  
      <!-- Edit Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 class="text-xl font-semibold mb-4">Editar Usuario</h2>
          <form @submit.prevent="updateUser">
            <div class="mb-4">
              <label class="block text-gray-700">Nombre</label>
              <input v-model="editUser.name" type="text" class="w-full p-2 border border-gray-300 rounded" required />
              <p v-if="!isValidEditName" class="text-red-500 text-sm">Nombre debe tener más de 4 letras y solo caracteres.</p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Correo Electrónico</label>
              <input v-model="editUser.email" type="email" class="w-full p-2 border border-gray-300 rounded" required />
              <p v-if="!isValidEditEmail" class="text-red-500 text-sm">Correo electrónico inválido.</p>
            </div>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Actualizar Usuario</button>
            <button type="button" @click="closeEditModal" class="bg-gray-500 text-white p-2 rounded ml-2">Cancelar</button>
          </form>
        </div>
      </div>
  
      <!-- Confirmation Modal -->
      <ConfirmDialog
        :isVisible="isConfirmDialogVisible"
        @onConfirm="handleConfirmDelete"
        @onCancel="handleCancelDelete"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useNuxtApp } from '#app';
  import ConfirmDialog from '~/components/ConfirmDialog.vue';
  
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
  const isConfirmDialogVisible = ref(false);
  const userIdToDelete = ref(null);
  const currentPage = ref(1);
  const itemsPerPage = 10;
  const searchQuery = ref('');
  
  const fetchUsers = async () => {
    try {
      const response = await $axios.get('/users', {
        params: { page: currentPage.value, limit: itemsPerPage }
      });
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
      newUser.value = { name: '', email: '', password: '' }; 
      confirmPassword.value = ''; 
      showForm.value = false; 
      await fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await $axios.delete(`/users/${id}`);
      await fetchUsers(); 
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
      showEditModal.value = false; 
      await fetchUsers(); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const closeEditModal = () => {
    showEditModal.value = false;
  };
  
  const openConfirmDialog = (id) => {
    userIdToDelete.value = id;
    isConfirmDialogVisible.value = true;
  };
  
  const handleConfirmDelete = async () => {
    if (userIdToDelete.value) {
      await deleteUser(userIdToDelete.value);
      isConfirmDialogVisible.value = false;
    }
  };
  
  const handleCancelDelete = () => {
    isConfirmDialogVisible.value = false;
  };
  
  const toggleForm = () => {
    showForm.value = !showForm.value;
  };
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchUsers();
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchUsers();
    }
  };

  const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return paginatedUsers.value;
  }
  return paginatedUsers.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
  
  onMounted(() => {
    fetchUsers();
  });
  
  // Computed Properties for Validations
  const isValidName = computed(() => /^[a-zA-Z]{4,}$/.test(newUser.value.name));
  const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.value.email));
  const isValidPassword = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,15}$/.test(newUser.value.password));
  const isPasswordsMatch = computed(() => newUser.value.password === confirmPassword.value);
  const isFormValid = computed(() => isValidName.value && isValidEmail.value && isValidPassword.value && isPasswordsMatch.value);
  
  const isValidEditName = computed(() => /^[a-zA-Z]{5,}$/.test(editUser.value.name));
  const isValidEditEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.value.email));
  const isValidEditForm = computed(() => isValidEditName.value && isValidEditEmail.value);
  </script>
  
  