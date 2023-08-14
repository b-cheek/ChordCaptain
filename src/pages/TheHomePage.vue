<script setup lang="ts">
import pb from '@/database/db'
</script>

<template>
  <header>
    <img alt="ChordCaptain logo" class="logo" src="@/assets/ChordCaptain_logo.svg" />
  </header>

  <main>
    <router-link to="/newExercise">New Exercise</router-link>
    <!-- <router-link to="/loadExercise">Load Exercise</router-link> -->
    <router-link to="/about">About</router-link>
    <router-link to="/signin">Sign In</router-link>
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
