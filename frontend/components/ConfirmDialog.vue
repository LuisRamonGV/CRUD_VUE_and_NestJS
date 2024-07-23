<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h3 class="text-lg font-semibold mb-4">Confirmación</h3>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <div class="flex justify-end mt-4">
          <button @click="confirm" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Sí</button>
          <button @click="cancel" class="bg-gray-300 px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isVisible: Boolean,
    onConfirm: Function,
    onCancel: Function
  });
  
  const emit = defineEmits(['onConfirm', 'onCancel']);
  
  const confirm = () => {
    emit('onConfirm');
  };
  
  const cancel = () => {
    emit('onCancel');
  };
  </script>
  