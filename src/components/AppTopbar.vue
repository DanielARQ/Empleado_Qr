<template>
  <header class="topbar">
    <div class="logo">
      <svg width="54" height="46" viewBox="0 0 54 46" fill="none" stroke="#343a40" stroke-width="4">
        <path d="M3 14 Q27 -2 51 14" />
        <path d="M9 20 Q27 8 45 20" />
        <path d="M12 24 Q27 50 42 24" />
        <circle cx="27" cy="21" r="5" />
      </svg>
      <div>Facultad de Negocios<br />UNACH</div>
    </div>

    <button class="menu-btn" aria-label="Mostrar u ocultar menú" @click="$emit('toggle-menu')">
      <i class="pi pi-bars"></i>
    </button>
  </header>
</template>

<script setup>
defineEmits(['toggle-menu'])
</script>
