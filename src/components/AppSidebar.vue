<template>
  <nav class="sidebar">
    <h4>UNIVERSIDAD AUTÓNOMA DE CHIAPAS</h4>
    <a href="#" class="item"><i class="pi pi-home"></i> Dashboard</a>

    <h4>MODULOS</h4>
    <router-link
      v-for="m in modulos"
      :key="m.label"
      :to="m.to"
      class="item"
      active-class="active"
    >
      <i :class="m.icon"></i> {{ m.label }}
    </router-link>
  </nav>
</template>

<script setup>
const modulos = [
  { label: 'Demo Clientes', icon: 'pi pi-id-card', to: '/formClientes' },
  { label: 'BarCode-QR', icon: 'pi pi-id-card', to: '/barcode' },
  { label: 'Empleados', icon: 'pi pi-id-card', to: '/empleados' },
  { label: 'Graficas', icon: 'pi pi-chart-bar', to: '/graficas' },
  { label: 'Input', icon: 'pi pi-check-square', to: '/input' },
  { label: 'Float Label', icon: 'pi pi-bookmark', to: '/floatlabel' },
  { label: 'Invalid State', icon: 'pi pi-exclamation-circle', to: '/invalid' },
  { label: 'Button', icon: 'pi pi-mobile', to: '/button' },
  { label: 'Table', icon: 'pi pi-table', to: '/table' },
  { label: 'List', icon: 'pi pi-list', to: '/list' },
  { label: 'Tree', icon: 'pi pi-share-alt', to: '/tree' },
  { label: 'Panel', icon: 'pi pi-tablet', to: '/panel' }
]
</script>
