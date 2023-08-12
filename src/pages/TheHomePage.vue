<script setup lang="ts">
import pb from '@/database/db'
async function auth() {
  const authData = await pb.collection('users').authWithPassword('users65522', 'passtest')
  console.log(pb.authStore.isValid)
  console.log(pb.authStore.token)
  console.log(pb.authStore)
}
</script>

<template>
  <header>
    <img alt="ChordCaptain logo" class="logo" src="../assets/ChordCaptain_logo.svg" />
  </header>

  <main>
    <!-- <button @click="navigateTo('newExercise')">New Exercise</button>
    <button>Load Exercise</button>
    <button @click="navigateTo('about')">About</button> -->
    <router-link to="/newExercise">New Exercise</router-link>
    <!-- <router-link to="/loadExercise">Load Exercise</router-link> -->
    <router-link to="/about">About</router-link>
    <button @click="auth()">debug auth</button>
    <button @click="pb.authStore.clear()">Logout</button>
  </main>
</template>

<style scoped>
.logo {
  width: 125px;
  height: 125px;
  display: block;
  margin: 0 auto 2rem;
}
</style>
