<script setup lang="ts">
import backIcon from '@/components/icons/IconBack.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

const router = useRouter()

const goBack = () => {
    router.push(`/${props.to}`)
}

</script>

<template>
    <button @click="goBack">
        <backIcon />
    </button>
</template>

<style scoped>
</style>