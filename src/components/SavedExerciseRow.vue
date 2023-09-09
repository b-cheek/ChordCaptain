<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExerciseStore } from '@/stores/exercise'
import XMarkIcon from '@/components/icons/IconXMark.vue'
import pb from '@/database/db'
import { formatDate } from '@/utils/formatting'

const router = useRouter()
const exerciseStore = useExerciseStore()

const props = defineProps<{
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

const row = ref<HTMLTableRowElement | null>(null)
const deleteCell = ref<HTMLTableCellElement | null>(null)

const goToExercise = (e: Event) => {
  if (!deleteCell.value?.contains(e.target as HTMLElement)) {
    router.push(`/exercise/${props.exercise.id}`)
  }
}

const deleteExercise = async () => {
  const confirm = window.confirm(`Are you sure you want to delete ${props.exercise.title}?`)
  if (confirm) {
    await pb.collection('exercises').delete(props.exercise.id)
    const table = document.getElementById('savedExercises') as HTMLTableElement
    table?.deleteRow(row.value!.rowIndex) // We know row has a value because we declare it in the template
  }
}
</script>

<template>
  <tr ref="row" @click="goToExercise">
    <td>{{ formatDate(exercise.created) }}</td>
    <td>{{ formatDate(exercise.updated) }}</td>
    <td>{{ exercise.title }}</td>
    <td>{{ exercise.key_tonic }} {{ exercise.key_mode }}</td>
    <td>{{ exercise.exercise_type }}</td>
    <td ref="deleteCell">
      <button @click="deleteExercise()"><XMarkIcon /></button>
    </td>
  </tr>
</template>
