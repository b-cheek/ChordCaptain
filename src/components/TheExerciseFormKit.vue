<script setup lang="ts">
// Routing here is programmatic to tie it to the submission of the form
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import pb from '@/database/db'

const router = useRouter()
const exerciseName = ref('')

async function handleSubmit() {
  await pb.collection('exercises').create({
    title: exerciseName.value
  })
  router.push(`/exercise/${exerciseName.value}`)
}
</script>

<template>
  <FormKit type="form" submit-label="Continue" @submit="handleSubmit()">
    <FormKit type="text" label="Name" />
    <FormKit
      type="radio"
      name="clef"
      label="Clef"
      :options="{
        treble: 'Treble',
        bass: 'Bass',
        grandStaff: 'Grand Staff'
      }"
    />
  </FormKit>
</template>

<style scoped></style>
