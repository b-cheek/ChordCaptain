import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/TheHomePage.vue'
import About from '@/pages/TheAboutPage.vue'
import NewExercise from '@/pages/TheNewExercisePage.vue'
import Exercise from '@/pages/TheExercisePage.vue'
import SignIn from '@/pages/TheSignInPage.vue'
import Register from '@/pages/TheRegisterPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/newExercise', component: NewExercise },
  { path: '/exercise/new', component: Exercise},
  { path: '/exercise/:id', component: Exercise },
  { path: '/signin', component: SignIn },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

export default router
