<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  exercise: {
    id: string
    created: string
    updated: string
    title: string
    key_tonic: string
    key_mode: string
    exercise_type: string
  }
}>()

const formatDate = (Datestring: string) => {
  const date = new Date(Datestring)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
</script>

<template>
  <tr @click="router.push(`/exercise/${exercise.id}`)">
    <td>{{ formatDate(exercise.created) }}</td>
    <td>{{ formatDate(exercise.updated) }}</td>
    <td>{{ exercise.title }}</td>
    <td>{{ exercise.key_tonic }} {{ exercise.key_mode }}</td>
    <td>{{ exercise.exercise_type }}</td>
  </tr>
</template>
