import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast , {
  autoClose: 3000,
  position: "top-right",
})

app.mount('#app')
