import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/TheHomePage.vue'
import About from './components/TheAboutPage.vue'
import NewExercise from './components/TheNewExercisePage.vue'
import Exercise from './components/TheExercisePage.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/newExercise', component: NewExercise },
  { path: '/exercise/:id', component: Exercise }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.mount('#app')
