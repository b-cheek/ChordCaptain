<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <header>
    <img alt="ChordCaptain logo" class="logo" src="../assets/ChordCaptain_logo.svg" />
  </header>

  <main>
    <button>New Exercise</button>
    <button>Load Exercise</button>
    <button @click="navigateTo('about')">About</button>
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
