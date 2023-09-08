<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import pb from '@/database/db'
import SavedExerciseRow from '@/components/SavedExerciseRow.vue'

const userStore = useUserStore()
const savedExercises = ref<any[]>([])

const getSavedExercises = async () => {
  const records = await pb.collection('exercises').getFullList({
    user: userStore.userID,
    filter: `user = '${userStore.userID}'`,
    expand: 'user'
  })
  savedExercises.value = records
}

onMounted(() => {
  getSavedExercises()
})
</script>

<template>
  <table id="savedExercises">
    <thead>
      <tr>
        <th>Created</th>
        <th>Updated</th>
        <th>Title</th>
        <th>Key</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <SavedExerciseRow
        v-for="exercise in savedExercises"
        :key="exercise.id"
        :exercise="{
          id: exercise.id,
          created: exercise.created,
          updated: exercise.updated,
          title: exercise.title,
          key_tonic: exercise.key_tonic,
          key_mode: exercise.key_mode,
          exercise_type: exercise.exercise_type
        }"
      />
    </tbody>
  </table>
  <p v-if="savedExercises.length === 0">No saved exercises</p>
</template>

<style scoped></style>
