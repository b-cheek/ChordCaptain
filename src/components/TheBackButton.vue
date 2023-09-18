<script setup lang="ts">
import backIcon from '@/components/icons/IconBack.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    callback: {
        type: Function,
        required: false
    },

    to: {
        type: String,
        required: true
    }
})

const router = useRouter()

const backBehavior = () => {
    if (props.callback) {
        props.callback()
    }
    router.push(`/${props.to}`)
}

</script>

<template>
    <button @click="backBehavior">
        <backIcon />
    </button>
</template>

<style scoped>
</style>