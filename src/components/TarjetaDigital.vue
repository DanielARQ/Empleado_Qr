<template>
  <div class="id-card">
    <div class="wave-top"></div>
    <div class="top"></div>

    <div class="company">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <rect x="8" y="8" width="28" height="28" transform="rotate(45 22 22)" fill="#fff" />
        <rect x="15" y="15" width="14" height="14" transform="rotate(45 22 22)" fill="#1a2e4f" />
        <rect x="19" y="19" width="6" height="6" transform="rotate(45 22 22)" fill="#fff" />
      </svg>
      <div><b>FACULTAD DE NEGOCIOS</b><small>UNACH</small></div>
    </div>

    <div class="avatar">
      <svg viewBox="0 0 140 140" width="100%" height="100%">
        <path
          v-if="sexo === 'M'"
          d="M70 22c-20 0-30 15-30 34 0 14-4 22-8 28h76c-4-6-8-14-8-28 0-19-10-34-30-34z"
          fill="#1a2e4f"
        />
        <circle v-else cx="70" cy="52" r="26" fill="#1a2e4f" />
        <path d="M20 140c4-30 24-44 50-44s46 14 50 44z" fill="#1a2e4f" />
        <path d="M66 96h8l-2 30h-4z" fill="#fff" />
      </svg>
    </div>

    <template v-if="rfc">
      <div class="name">{{ nombre }}<br />{{ apellidos }}</div>
      <div class="role">{{ sexo === 'M' ? 'Empleada' : 'Empleado' }}</div>
      <div class="rfc">ID : {{ rfc }}</div>
      <svg ref="barcode" class="barcode"></svg>
    </template>
    <template v-else>
      <div class="name placeholder">NOMBRE<br />APELLIDOS</div>
      <div class="role placeholder">Empleado(a)</div>
      <div class="rfc placeholder">ID : ——————</div>
    </template>

    <div class="bottom"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import JsBarcode from 'jsbarcode'

const props = defineProps({
  nombre: String,
  apellidos: String,
  sexo: { type: String, default: 'M' },
  rfc: String
})

const barcode = ref(null)

// Cada vez que cambia el RFC se vuelve a dibujar el código de barras
watch(
  () => props.rfc,
  async (valor) => {
    if (!valor) return
    await nextTick()
    JsBarcode(barcode.value, valor, {
      format: 'CODE128',
      width: 1.4,
      height: 45,
      fontSize: 13,
      margin: 0,
      lineColor: '#000'
    })
  }
)
</script>
