import './assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import { plugin, defaultConfig } from '@formkit/vue'

createApp(App)
  .use(router)
  // .use(plugin, defaultConfig)
  .mount('#app')
