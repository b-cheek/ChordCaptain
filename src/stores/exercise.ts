import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { ExerciseOptions } from '@/models/exerciseTypes'

export const useExerciseStore = defineStore('exercise', () => {
  // State variables
  const exerciseName = ref(useLocalStorage('exerciseName', ''))
  const clef = ref(useLocalStorage('clef', ''))
  const numMeasures = ref(useLocalStorage('numMeasures', 0))
  const keyTonic = ref(useLocalStorage('keyTonic', ''))
  const keyMode = ref(useLocalStorage('keyMode', ''))
  const meter = ref(useLocalStorage('meter', ''))
  const bottomNote = ref(useLocalStorage('bottomNote', ''))
  const topNote = ref(useLocalStorage('topNote', ''))
  const exerciseType = ref(useLocalStorage('exerciseType', ''))
  const chordsPerMeasure = ref(useLocalStorage('chordsPerMeasure', ''))
  const playbackBpm = ref(useLocalStorage('playbackBpm', 0))
  const baseRhythm = ref(useLocalStorage('baseRhythm', ''))

  // Actions
  function loadNew() {}

  function loadExisting(exercise: ExerciseOptions) {
    exerciseName.value = exercise.exerciseName
    clef.value = exercise.clef
    numMeasures.value = exercise.numMeasures
    keyTonic.value = exercise.keyTonic
    keyMode.value = exercise.keyMode
    meter.value = exercise.meter
    bottomNote.value = exercise.bottomNote
    topNote.value = exercise.topNote
    exerciseType.value = exercise.exerciseType
    chordsPerMeasure.value = exercise.chordsPerMeasure
    playbackBpm.value = exercise.playbackBpm
    baseRhythm.value = exercise.baseRhythm
  }

  function clear() {
    exerciseName.value = ''
    clef.value = ''
    numMeasures.value = 0
    keyTonic.value = ''
    keyMode.value = ''
    meter.value = ''
    bottomNote.value = ''
    topNote.value = ''
    exerciseType.value = ''
    chordsPerMeasure.value = ''
    playbackBpm.value = 0
    baseRhythm.value = ''
  }

  return {
    exerciseName,
    clef,
    numMeasures,
    keyTonic,
    keyMode,
    meter,
    bottomNote,
    topNote,
    exerciseType,
    chordsPerMeasure,
    playbackBpm,
    baseRhythm,
    loadNew,
    loadExisting,
    clear
  }
})