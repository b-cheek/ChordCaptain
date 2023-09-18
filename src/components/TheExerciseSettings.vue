<script setup lang="ts">
// Routing here is programmatic to tie it to the submission of the form
import { useExerciseStore } from '@/stores/exercise'

const exercise = useExerciseStore()
</script>

<template>
  <!-- <form> -->
  <label for="exerciseName">Name</label>
  <input id="exerciseName" type="text" v-model="exercise.exerciseName" />
  <fieldset>
    <legend>Clef</legend>
    <input type="radio" id="treble" name="clef" value="treble" v-model="exercise.clef" />
    <label for="treble">Treble</label>
    <input type="radio" id="bass" name="clef" value="bass" v-model="exercise.clef" />
    <label for="bass">Bass</label>
    <!-- <input type="radio" id="grandStaff" name="clef" value="grand_staff" v-model="exercise.clef" />
    <label for="grandStaff">Grand Staff</label> -->
  </fieldset>
  <label for="numMeasures">Number of Measures</label>
  <input id="numMeasures" type="number" v-model.number="exercise.numMeasures" />
  <fieldset>
    <legend>Key</legend>
    <label for="keyTonic">Tonic</label>
    <input type="text" id="keyTonic" v-model="exercise.keyTonic" />
    <fieldset>
      <legend>Mode</legend>
      <input type="radio" id="major" name="keyMode" value="major" v-model="exercise.keyMode" />
      <label for="major">Major</label>
      <input type="radio" id="minor" name="keyMode" value="minor" v-model="exercise.keyMode" />
      <label for="minor">Minor</label>
    </fieldset>
  </fieldset>
  <label for="timeSignature">Time Signature</label>
  <select id="timeSignature" v-model="exercise.meter">
    <option value="4/4">4/4</option>
    <option value="3/4">3/4</option>
    <option value="2/4">2/4</option>
    <!-- <option value="2/2">2/2</option> -->
    <option value="5/4">5/4</option>
  </select>
  <fieldset>
    <legend>Range</legend>
    <label for="bottomNote">Bottom Note</label>
    <input id="bottomNote" type="text" v-model="exercise.bottomNote" />
    <label for="topNote">Top Note</label>
    <input id="topNote" type="text" v-model="exercise.topNote" />
  </fieldset>
  <!-- <span>or</span>
  <label for="instrument">Instrument</label>
  <select id="instrument">
    <option value="Alto Saxophone">Alto Saxophone</option>
    <option value="Tenor Saxophone">Tenor Saxophone</option>
    <option value="Baritone Saxophone">Baritone Saxophone</option>
    <option value="Clarinet">Clarinet</option>
    <option value="Flute">Flute</option>
    <option value="Trumpet">Trumpet</option>
    <option value="Trombone">Trombone</option>
    <option value="Bass Trombone">Bass Trombone</option>
    <option value="Piano">Piano</option>
    <option value="Guitar">Guitar</option>
    <option value="Bass">Bass</option>
  </select> -->
  <fieldset>
    <legend>Exercise Type</legend>
    <input
      type="radio"
      id="stepwise"
      name="exerciseType"
      value="stepwise"
      v-model="exercise.exerciseType"
    />
    <label for="stepwise">Stepwise</label>
    <input
      type="radio"
      id="arpeggiated"
      name="exerciseType"
      value="arpeggiated"
      v-model="exercise.exerciseType"
    />
    <label for="arpeggiated">Arpeggiated</label>
    <!-- <input
      type="radio"
      id="mixed"
      name="exerciseType"
      value="mixed"
      v-model="exercise.exerciseType"
    />
    <label for="mixed">Mixed</label> -->
  </fieldset>
  <!-- <fieldset>
    <legend>Chords Per Measure</legend>
    <input
      type="radio"
      id="one"
      name="chordsPerMeasure"
      value="1"
      v-model="exercise.chordsPerMeasure"
    />
    <label for="one">1</label>
    <input
      type="radio"
      id="two"
      name="chordsPerMeasure"
      value="2"
      v-model="exercise.chordsPerMeasure"
    />
    <label for="two">2</label>
    <input
      type="radio"
      id="custom"
      name="chordsPerMeasure"
      value="custom"
      v-model="exercise.chordsPerMeasure"
    />
    <label for="custom">Custom</label>
  </fieldset> -->
  <!-- <label for="playbackBpm">Playback BPM</label>
  <input id="playbackBpm" type="number" v-model.number="exercise.playbackBpm" /> -->
  <fieldset>
    <legend>Rhythm</legend>
    <input type="radio" id="8" name="rhythm" value="1/8" v-model="exercise.baseRhythm" />
    <label for="8">Eighth Notes</label>
    <input type="radio" id="16" name="rhythm" value="1/16" v-model="exercise.baseRhythm" />
    <label for="16">Sixteenth Notes</label>
    <input type="radio" id="4" name="rhythm" value="1/4" v-model="exercise.baseRhythm" />
    <label for="4">Quarter Notes</label>
  </fieldset>
  <!-- </form> -->
</template>

<style scoped>
* {
  font-size: 0.75em;
}
</style>
