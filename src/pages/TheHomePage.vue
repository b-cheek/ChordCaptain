<script setup lang="ts">
import ChordCaptainIcon from '@/components/icons/IconChordCaptain.vue'
import pb from '@/database/db'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function logout() {
  userStore.clear()
  pb.authStore.clear()
}
</script>

<template>
  <header>
    <ChordCaptainIcon />
  </header>

  <main>
    <router-link to="/newExercise">New Exercise</router-link>
    <!-- <router-link to="/loadExercise">Load Exercise</router-link> -->
    <router-link to="/about">About</router-link>
    <router-link to="/signin">Sign In</router-link>
    <button @click="logout">Logout</button>
  </main>
</template>

<style scoped></style>
