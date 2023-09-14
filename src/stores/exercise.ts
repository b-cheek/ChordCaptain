import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { ExerciseOptions } from '@/models/exerciseTypes'
import { chordList } from '@/utils/abc'

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

  const chords = ref(useLocalStorage('chords', new chordList()))

  // Actions
  function loadNew() {
    exerciseName.value = 'New Exercise'
    clef.value = 'treble'
    numMeasures.value = 16
    keyTonic.value = 'Bb'
    keyMode.value = 'major'
    meter.value = '4/4'
    bottomNote.value = 'C3'
    topNote.value = 'C5'
    exerciseType.value = 'stepwise'
    chordsPerMeasure.value = '2'
    playbackBpm.value = 120
    baseRhythm.value = '1/4'
    chords.value.list = new Array(numMeasures.value * Number(meter.value.split('/')[0])).fill('')
  }

  function setChords() {
    chords.value.list = new Array(numMeasures.value * Number(meter.value.split('/')[0])).fill('')
  }

  function loadExisting(exercise: ExerciseOptions, chordString: string) {
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
    chords.value.list = chordString.split(',')
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
    chords.value = new chordList()
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
    chords,
    setChords,
    loadNew,
    loadExisting,
    clear
  }
})
