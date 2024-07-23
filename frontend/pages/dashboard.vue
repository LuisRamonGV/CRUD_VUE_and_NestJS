<template>
  <div class="flex">
    <div class="bg-slate-800 text-white p-4 fixed top-0 left-0 h-full w-64 z-20">
      <div class="mb-4 text-white">Dashboard</div>
      <h3>By Ramon Garcia</h3>
    </div>
    <div class="flex-1 ml-64">
      <Navbar />
      <div class="mt-16 p-4">
        <UserTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import UserTable from '~/pages/UserTable.vue';
</script>

<style scoped>
.ml-64 {
  margin-left: 16rem;
}
</style>
