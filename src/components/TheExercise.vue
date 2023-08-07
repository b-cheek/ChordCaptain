<script setup lang="ts">
import abcjs from 'abcjs';
import { onMounted } from 'vue';

const measures = 32
let abcString =
`X: 1
T: Demo
K: none
M: C
L: 1/4
U: s=!style=rhythm!
`
for (let i = 0; i < measures; i++) {
    abcString += `sB0 sB0 sB0 sB0|`
}

onMounted(() => {
    abcjs.renderAbc("exerciseContainer", abcString)
})
</script>

<template>
    <div id="exerciseContainer"></div>
</template>