<template>
  <div class="vista">
    <!-- FORMULARIO -->
    <Card class="panel form-panel">
      <template #title>GENERAR EL RFC DE UNA PERSONA</template>
      <template #content>
        <Message v-if="error" severity="error" class="mb">{{ error }}</Message>

        <form @submit.prevent="generar">
          <label for="nombre">Nombre(s):</label>
          <InputText id="nombre" v-model="persona.nombre" fluid />

          <label for="paterno">Apellido Paterno:</label>
          <InputText id="paterno" v-model="persona.paterno" fluid />

          <label for="materno">Apellido Materno:</label>
          <InputText id="materno" v-model="persona.materno" fluid />

          <label for="fecha">Fecha Nacimiento:</label>
          <DatePicker
            inputId="fecha"
            v-model="persona.fecha"
            dateFormat="dd/mm/yy"
            showIcon
            iconDisplay="input"
            :maxDate="new Date()"
            fluid
          />

          <label for="sexo">Sexo:</label>
          <Select
            inputId="sexo"
            v-model="persona.sexo"
            :options="sexos"
            optionLabel="label"
            optionValue="value"
            fluid
          />

          <label for="rfc">RFC:</label>
          <InputText id="rfc" :modelValue="rfc" readonly fluid />

          <Button type="submit" label="GENERAR" severity="success" class="btn-generar" />
        </form>
      </template>
    </Card>

    <!-- TARJETA DIGITAL -->
    <Card class="panel card-panel">
      <template #title>TARJETA DIGITAL</template>
      <template #content>
        <TarjetaDigital
          :nombre="tarjeta.nombre"
          :apellidos="tarjeta.apellidos"
          :sexo="tarjeta.sexo"
          :rfc="rfc"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Message from 'primevue/message'

import TarjetaDigital from '../components/TarjetaDigital.vue'
import { generarRFC } from '../utils/rfc'

const sexos = [
  { label: 'Mujer', value: 'M' },
  { label: 'Hombre', value: 'H' }
]

const persona = reactive({
  nombre: '',
  paterno: '',
  materno: '',
  fecha: null,
  sexo: 'M'
})

// Datos que muestra la tarjeta (se actualizan solo al dar clic en GENERAR)
const tarjeta = reactive({ nombre: '', apellidos: '', sexo: 'M' })
const rfc = ref('')
const error = ref('')

function generar() {
  error.value = ''
  if (!persona.nombre.trim() || !persona.paterno.trim() || !persona.fecha) {
    error.value = 'Nombre, apellido paterno y fecha de nacimiento son obligatorios.'
    return
  }

  rfc.value = generarRFC(persona.nombre, persona.paterno, persona.materno, persona.fecha)
  tarjeta.nombre = persona.nombre.trim()
  tarjeta.apellidos = `${persona.paterno} ${persona.materno}`.trim()
  tarjeta.sexo = persona.sexo
}
</script>
