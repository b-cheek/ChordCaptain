<script setup lang="ts">
import { ref } from 'vue'
import pb from '@/database/db'
import router from '@/router/router'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')


async function register() {
    try {
        await pb.collection('users').create({
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        })
    }
    catch (e) {
        alert('Invalid Credentials')
        console.error(e)
    }

    // Can't think of a reason this would throw an error
    await pb.collection('users').authWithPassword(email.value, password.value)
    router.push('/')
}
</script>

<template>
    <form @submit.prevent="register">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" id="passwordConfirm" v-model="passwordConfirm" required />
        <button type="submit">Sign up</button>
    </form>
</template>