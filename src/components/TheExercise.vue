<script setup lang="ts">
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import pb from '@/database/db'
import { useRoute } from 'vue-router'
import { useExerciseStore } from '@/stores/exercise'
import { useUserStore } from '@/stores/user'
import SettingsIcon from '@/components/icons/IconSettings.vue'
import BackButton from '@/components/TheBackButton.vue'
import ExerciseSettings from '@/components/TheExerciseSettings.vue'
import type { ExerciseOptions } from '@/models/exerciseTypes'
import { formatDate } from '@/utils/formatting'
import router from '@/router/router'
import { writeAbc, loadAbc } from '@/utils/abc'

const route = useRoute()
const localExercise = useExerciseStore()
const userStore = useUserStore()
const lastSaved = ref('')
let visualObj: any
if (!route.params.id) { // Double nested if so the else only occurs when the exercise is saved
  if (!localExercise.exerciseName) {
    localExercise.loadNew()
  }
} else {
  const exercise = await pb
    .collection('exercises')
    .getOne(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id, {
      expand: 'user'
    })

  lastSaved.value = formatDate(exercise.updated)

  // Check if the store is empty, will persist for page reload but is cleared after leaving exercise
  if (!localExercise.exerciseName) {
    localExercise.loadExisting(
      {
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
      } as ExerciseOptions,
      exercise.chordString
    )
  }
}

let computedAbc = computed(() => {
  return writeAbc(localExercise as ExerciseOptions, localExercise.chords.list)
})

let showSettings = ref(false)

const toggleSettings = () => {
  showSettings.value = !showSettings.value
  if (!showSettings.value) visualObj = loadAbc('exerciseContainer', computedAbc.value)
}

const saveExercise = async () => {
  if (!route.params.id) {
    const record = await pb.collection('exercises').create({
      title: localExercise.exerciseName,
      clef: localExercise.clef,
      num_measures: localExercise.numMeasures,
      key_tonic: localExercise.keyTonic,
      key_mode: localExercise.keyMode,
      meter: localExercise.meter,
      bottom_note: localExercise.bottomNote,
      top_note: localExercise.topNote,
      exercise_type: localExercise.exerciseType,
      chords_per_measure: localExercise.chordsPerMeasure,
      playback_bpm: localExercise.playbackBpm,
      base_rhythm: localExercise.baseRhythm,
      user: pb.authStore.model!.id,
      chordString: localExercise.chords.list.join(',')
    })
    router.push(`/exercise/${record.id}`)
  } else {
    pb.collection('exercises').update(
      Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
      {
        title: localExercise.exerciseName,
        clef: localExercise.clef,
        num_measures: localExercise.numMeasures,
        key_tonic: localExercise.keyTonic,
        key_mode: localExercise.keyMode,
        meter: localExercise.meter,
        bottom_note: localExercise.bottomNote,
        top_note: localExercise.topNote,
        exercise_type: localExercise.exerciseType,
        chords_per_measure: localExercise.chordsPerMeasure,
        playback_bpm: localExercise.playbackBpm,
        base_rhythm: localExercise.baseRhythm,
        chordString: localExercise.chords.list.join(',')
      }
    )
  }
  lastSaved.value = formatDate(new Date().toString())
}

const updateChord = (event: any) => {
  localExercise.chords.list[localExercise.selectedChordIndex] = event.target.value
  localExercise.selectedChordIndex = -1
  visualObj = loadAbc('exerciseContainer', computedAbc.value)
  event.target.style.display = 'none'
}

const hideInput = (event: any) => {
  event.target.style.display = 'none'
}

const debug = () => {
  console.log(visualObj)
}

onMounted(() => {
  visualObj = loadAbc('exerciseContainer', computedAbc.value)[0]
})
</script>

<template>
  <BackButton :callback="localExercise.clear" to="" />
  <button @click="saveExercise" :disabled="!userStore.userID">Save</button>
  <button @click="toggleSettings" id="settingsButton"><SettingsIcon /></button>
  <span v-if="lastSaved">Last saved at {{ lastSaved }}</span>
  <span v-if="!userStore.userID">Log in to save exercises</span>
  <!-- <button @click="debug" style="display: block;">debug</button> -->
  <div display="block" style="height:10px"></div> <!-- Removing this adds a margin under the floated right settings button >:(-->

  <div id="exerciseContainer"></div>
  <div id="settingsContainer" v-show="showSettings">
    <ExerciseSettings />
  </div>
  <input
    id="chordInput"
    type="text"
    :value="localExercise.chords.list[localExercise.selectedChordIndex]"
    @change="updateChord"
    @blur="hideInput" 
  /> <!-- blur is so the input box disappears when the user clicks away from the chord without changing value-->
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

#chordInput {
  display: none;
  position: absolute;
  width: auto;
}

.abcjs-text {
  stroke: red;
  fill: red;
}
</style>
