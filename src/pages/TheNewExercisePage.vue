<script setup lang="ts">
import ExerciseForm from '../components/TheExerciseForm.vue'
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
