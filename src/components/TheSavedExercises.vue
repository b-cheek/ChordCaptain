<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import pb from '@/database/db'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const savedExercises = ref<any[]>([])
const router = useRouter()

const getSavedExercises = async () => {
    const records = await pb.collection('exercises').getFullList({
        user: userStore.userID,
        filter: `user = '${userStore.userID}'`,
        expand: "user"
    })
    savedExercises.value = records
}

onMounted(() => {
    getSavedExercises()
})

</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Created</th>
                <th>Title</th>
                <th>Key</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr @click="router.push(`/exercise/${exercise.id}`)" v-for="exercise in savedExercises" :key="exercise.id">
                <td>{{ exercise.created }}</td>
                <td>{{ exercise.title }}</td>
                <td>{{ exercise.key_tonic }} {{ exercise.key_mode }}</td>
                <td>{{ exercise.exercise_type }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>