<script setup lang="ts">
import { ref } from 'vue'
import pb from '@/database/db'
import router from '@/router/router'
import { useUserStore } from '@/stores/user'
import BackButton from '@/components/TheBackButton.vue'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

async function signIn() {
  try {
    const authRecord = await pb.collection('users').authWithPassword(email.value, password.value)
    // Store the user id in the store (reactive local storage)
    if (authRecord) {
      userStore.userID = authRecord.record.id
    }
    router.push('/')
  } catch (e) {
    alert('Invalid Credentials')
    console.error(e)
  }
}
</script>

<template>
  <BackButton to="" />
  <form @submit.prevent="signIn">
    <label for="email">Email</label>
    <input type="email" id="email" v-model="email" required />
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" required />
    <button type="submit">Sign In</button>
  </form>
  <span>Don't have an account yet?</span>
  <router-link to="/register">Register</router-link>
</template>
