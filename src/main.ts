import './assets/main.css'

import { createApp } from 'vue'
// import { plugin, defaultConfig } from '@formkit/vue'
import { createPinia } from 'pinia'
import router from '@/router/router'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
// app.use(plugin, defaultConfig)
app.use(pinia)
app.mount('#app')
