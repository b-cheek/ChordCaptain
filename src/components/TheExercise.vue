<script setup lang="ts">
import { onMounted } from 'vue'
import abcjs from 'abcjs'
import pb from '@/database/db'
import { useRoute } from 'vue-router'

const route = useRoute()
const exercise = await pb
  .collection('exercises')
  .getOne(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id, {
    expand: 'user'
  })

let abcString = `
X: 1
T: ${exercise.title}
K: ${exercise.key_tonic}${exercise.key_mode == 'minor' ? 'm' : ''}
M: ${exercise.meter}
L: ${exercise.base_rhythm}
U: s=!style=rhythm!
`
for (let i = 0; i < exercise.num_measures; i++) {
  abcString += `sB0 sB0 sB0 sB0|`
}

onMounted(() => {
  abcjs.renderAbc('exerciseContainer', abcString)
})
</script>

<template>
  <div id="exerciseContainer"></div>
</template>
