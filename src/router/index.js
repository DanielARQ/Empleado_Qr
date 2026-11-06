import { createRouter, createWebHashHistory } from 'vue-router'
import FormClientes from '../views/FormClientes.vue'

// Modo hash (localhost:8080/#/formClientes), igual que en el mockup
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/formClientes' },
    { path: '/formClientes', name: 'formClientes', component: FormClientes },
    // Módulos que todavía no existen regresan al formulario
    { path: '/:pathMatch(.*)*', redirect: '/formClientes' }
  ]
})

export default router
