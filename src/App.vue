<template>
  <AppTopbar @toggle-menu="menuAbierto = !menuAbierto" />

  <div class="layout">
    <AppSidebar v-show="menuAbierto" />
    <main class="contenido">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppTopbar from './components/AppTopbar.vue'
import AppSidebar from './components/AppSidebar.vue'

const menuAbierto = ref(true)
</script>
