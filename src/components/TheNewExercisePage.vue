<script setup lang="ts">
import ExerciseForm from './TheExerciseForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <header>
    <button>Back</button>
    <h1>ChordCaptain</h1>
    <img alt="ChordCaptain logo" class="logo" src="../assets/ChordCaptain_logo.svg" />
  </header>

  <main>
    <ExerciseForm />
  </main>
</template>

<style scoped>
.logo {
  width: 125px;
  height: 125px;
  display: inline-block;
  margin: 0 auto 2rem;
}
</style>
