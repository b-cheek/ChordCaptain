<script setup lang="ts"></script>

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
