<script setup lang="ts">
import ChordCaptainIcon from '@/components/icons/IconChordCaptain.vue'
import pb from '@/database/db'
import { useUserStore } from '@/stores/user'
import SavedExercises from '@/components/TheSavedExercises.vue'

const userStore = useUserStore()

function logout() {
  userStore.clear()
  pb.authStore.clear()
}
</script>

<template>
  <header>
    <ChordCaptainIcon />
    <h1>ChordCaptain</h1>
  </header>

  <main>
    <router-link to="/exercise/new">New Exercise</router-link>
    <router-link to="/signin">Sign In</router-link>
    <SavedExercises v-if="userStore.userID" />
    <!-- Only show if logged in -->
    <router-link to="/about">About</router-link>
    <button @click="logout">Logout</button>
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
}

main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: row wrap;
  gap: 1rem;
}
</style>
