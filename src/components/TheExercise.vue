<script setup lang="ts">
import { useRoute } from 'vue-router'
import abcjs from 'abcjs'
import { onMounted } from 'vue'

const route = useRoute()
const measures = 32

let abcString = `X: 1
T: ${route.params.exerciseName}
K: none
M: C
L: 1/4
U: s=!style=rhythm!
`
for (let i = 0; i < measures; i++) {
  abcString += `sB0 sB0 sB0 sB0|`
}

onMounted(() => {
  abcjs.renderAbc('exerciseContainer', abcString)
})
</script>

<template>
  <div id="exerciseContainer"></div>
</template>
