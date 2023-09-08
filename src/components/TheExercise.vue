<script setup lang="ts">
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import abcjs from 'abcjs'
import pb from '@/database/db'
import { useRoute } from 'vue-router'
import { useExerciseStore } from '@/stores/exercise'
import SettingsIcon from '@/components/icons/IconSettings.vue'
import ExerciseSettings from '@/components/TheExerciseSettings.vue'
import type { ExerciseOptions } from '@/models/exerciseTypes'

const route = useRoute()
const exercise = await pb
  .collection('exercises')
  .getOne(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id, {
    expand: 'user'
  })

const localExercise = useExerciseStore()

if (localExercise.exerciseName == '') {
  // Check if the store is empty
  localExercise.loadExisting({
    exerciseName: exercise.title,
    clef: exercise.clef,
    numMeasures: exercise.num_measures,
    keyTonic: exercise.key_tonic,
    keyMode: exercise.key_mode,
    meter: exercise.meter,
    bottomNote: exercise.bottom_note,
    topNote: exercise.top_note,
    exerciseType: exercise.exercise_type,
    chordsPerMeasure: exercise.chords_per_measure,
    playbackBpm: exercise.playback_bpm,
    baseRhythm: exercise.base_rhythm
  } as ExerciseOptions)
}

let showSettings = ref(false)

let computedAbc = computed(() => {
  let abcString = `
X: 1
T: ${localExercise.exerciseName}
K: ${localExercise.keyTonic}${localExercise.keyMode == 'minor' ? 'm' : ''}
M: ${localExercise.meter}
L: ${localExercise.baseRhythm}
U: s=!style=rhythm!
`
  for (let i = 0; i < localExercise.numMeasures; i++) {
    abcString += `sB0 sB0 sB0 sB0|`
  }
  return abcString
})

const loadAbc = () => {
  abcjs.renderAbc('exerciseContainer', computedAbc.value, {
    wrap: {
      minSpacing: 1.8, // Values from docs: https://paulrosen.github.io/abcjs/visual/render-abc-options.html#wrap
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    },
    // Staffwidth MUST be set for wrap to work. It is overridden by the responsive option.
    // Also note that we are guaranteeing that 'exerciseContainer' is mounted by using onMounted
    staffwidth: document.getElementById('exerciseContainer')!.clientWidth * 0.95,
    responsive: 'resize'
  })
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
  if (!showSettings.value) loadAbc()
}

onMounted(() => {
  loadAbc()
})
</script>

<template>
  <button @click="toggleSettings" id="settingsButton"><SettingsIcon /></button>
  <div id="exerciseContainer"></div>
  <div id="settingsContainer" v-show="showSettings">
    <ExerciseSettings />
  </div>
</template>

<style scoped>
#settingsButton {
  float: right;
}

#settingsContainer {
  width: 90%;
  height: 90%;
  position: fixed;
  top: 5%;
  left: 5%;
  background-color: white;
  padding: 2rem;
  border: 1px black solid;
  border-radius: 1em;
}
</style>
