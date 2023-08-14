<script setup lang="ts">
import { ref } from 'vue'
import pb from '@/database/db'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')


async function signup() {
    await pb.collection('users').create({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value
    })
}
</script>

<template>
    <form @submit.prevent="signup">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" />
        <button type="submit">Sign up</button>
    </form>
</template>