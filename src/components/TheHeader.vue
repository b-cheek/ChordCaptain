<script setup lang="ts">
import ChordCaptainIcon from '@/components/icons/IconChordCaptain.vue'

function goBack() {
  window.history.back()
}
</script>

<template>
  <header>
    <button @click="goBack">Back</button>
    <h1>ChordCaptain</h1>
    <ChordCaptainIcon />
  </header>
</template>

<style scoped></style>
