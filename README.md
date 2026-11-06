# Tarjeta Digital – Facultad de Negocios UNACH

Interfaz para generar el RFC de una persona y su tarjeta digital de empleado.

**Tecnología:** Vue 3 + PrimeVue 4 (Vite)

## Correr en tu computadora

```bash
npm install
npm run dev
```

Abre http://localhost:8080/#/formClientes

## Subir a Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → **Add New → Project** → importa el repositorio.
3. Vercel detecta Vite solo (build: `npm run build`, salida: `dist`). Da clic en **Deploy**.

## Estructura

```
src/
├── main.js                  configuración de Vue, PrimeVue y router
├── App.vue                  layout general (barra superior + menú + vista)
├── router/index.js          rutas (modo hash: /#/formClientes)
├── components/
│   ├── AppTopbar.vue        barra superior
│   ├── AppSidebar.vue       menú lateral
│   └── TarjetaDigital.vue   tarjeta con código de barras
├── views/
│   └── FormClientes.vue     formulario + tarjeta
├── utils/rfc.js             lógica para generar el RFC
└── assets/styles.css        estilos
```
