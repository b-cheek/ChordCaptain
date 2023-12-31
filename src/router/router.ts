import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/TheHomePage.vue'
import About from '../pages/TheAboutPage.vue'
import NewExercise from '../pages/TheNewExercisePage.vue'
import Exercise from '../pages/TheExercisePage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/newExercise', component: NewExercise },
  { path: '/exercise/:exerciseName', component: Exercise }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

export default router
