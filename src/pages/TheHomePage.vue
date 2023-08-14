<script setup lang="ts">
import ChordCaptainIcon from '@/components/icons/IconChordCaptain.vue'
import pb from '@/database/db'
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
    <button @click="pb.authStore.clear()">Logout</button>
  </main>
</template>

<style scoped></style>
