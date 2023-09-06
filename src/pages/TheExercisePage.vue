<script setup lang="ts">
import Exercise from '@/components/TheExercise.vue'
</script>

<template>
  <main>
    <Suspense>
      <!-- Exercise depends on the async access of exercise data from database to render -->
      <Exercise />
    </Suspense>
    <!-- See suspense tag info: https://vuejs.org/guide/built-ins/suspense.html -->
  </main>
</template>

<style scoped></style>
