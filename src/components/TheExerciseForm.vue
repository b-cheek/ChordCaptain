<script setup lang="ts">
// Routing here is programmatic to tie it to the submission of the form
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import pb from '@/database/db'

const router = useRouter()
const exerciseName = ref('')
const clef = ref('')
const numMeasures = ref(0)
const key_tonic = ref('')
const key_mode = ref('')
const meter = ref('')
const bottom_note = ref('')
const top_note = ref('')
const exercise_type = ref('')
const chords_per_measure = ref('')
const playback_bpm = ref(0)
const base_rhythm = ref(0)

async function submit() {
  try {
    // The database throws an error if the user is not logged in, so
    // We know that pb.authStore is valid
    await pb.collection('exercises').create({
      title: exerciseName.value,
      clef: clef.value,
      numMeasures: numMeasures.value,
      key_tonic: key_tonic.value.toUpperCase(),
      key_mode: key_mode.value,
      meter: meter.value,
      bottom_note: bottom_note.value.toUpperCase(),
      top_note: top_note.value.toLocaleUpperCase(),
      exercise_type: exercise_type.value,
      chords_per_measure: chords_per_measure.value,
      playback_bpm: playback_bpm.value,
      base_rhythm: base_rhythm.value,
      user: pb.authStore.model!.id
    })
    // I guess it's better to just use the single relation from the child?
    // await pb.collection('users').update(pb.authStore.model!.id, {
    //   'exercises+': record.id
    // })
    router.push(`/exercise/${exerciseName.value}`)
  } catch (e) {
    alert('Invalid fields')
    console.error(e)
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="exerciseName">Name</label>
    <input id="exerciseName" type="text" v-model="exerciseName" />
    <fieldset>
      <legend>Clef</legend>
      <input type="radio" id="treble" name="clef" value="treble" v-model="clef" />
      <label for="treble">Treble</label>
      <input type="radio" id="bass" name="clef" value="bass" v-model="clef" />
      <label for="bass">Bass</label>
      <input type="radio" id="grandStaff" name="clef" value="grand_staff" v-model="clef" />
      <label for="grandStaff">Grand Staff</label>
    </fieldset>
    <label for="numMeasures">Number of Measures</label>
    <input id="numMeasures" type="number" v-model.number="numMeasures" />
    <fieldset>
      <legend>Key</legend>
      <label for="key_tonic">Tonic</label>
      <input type="text" id="key_tonic" v-model="key_tonic" />
      <fieldset>
        <legend>Mode</legend>
        <input type="radio" id="major" name="key_mode" value="major" v-model="key_mode" />
        <label for="major">Major</label>
        <input type="radio" id="minor" name="key_mode" value="minor" v-model="key_mode" />
        <label for="minor">Minor</label>
      </fieldset>
    </fieldset>
    <label for="timeSignature">Time Signature</label>
    <select id="timeSignature" v-model="meter">
      <option value="4/4">4/4</option>
      <option value="3/4">3/4</option>
      <option value="2/4">2/4</option>
      <option value="2/2">2/2</option>
      <option value="5/4">5/4</option>
    </select>
    <fieldset>
      <legend>Range</legend>
      <label for="bottomNote">Bottom Note</label>
      <input id="bottomNote" type="text" v-model="bottom_note" />
      <label for="topNote">Top Note</label>
      <input id="topNote" type="text" v-model="top_note" />
    </fieldset>
    <span>or</span>
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
    </select>
    <fieldset>
      <legend>Exercise Type</legend>
      <input
        type="radio"
        id="stepwise"
        name="exerciseType"
        value="stepwise"
        v-model="exercise_type"
      />
      <label for="stepwise">Stepwise</label>
      <input
        type="radio"
        id="arpeggiated"
        name="exerciseType"
        value="arpeggiated"
        v-model="exercise_type"
      />
      <label for="arpeggiated">Arpeggiated</label>
      <input type="radio" id="mixed" name="exerciseType" value="mixed" v-model="exercise_type" />
      <label for="mixed">Mixed</label>
    </fieldset>
    <fieldset>
      <legend>Chords Per Measure</legend>
      <input type="radio" id="one" name="chordsPerMeasure" value="1" v-model="chords_per_measure" />
      <label for="one">1</label>
      <input type="radio" id="two" name="chordsPerMeasure" value="2" v-model="chords_per_measure" />
      <label for="two">2</label>
      <input
        type="radio"
        id="custom"
        name="chordsPerMeasure"
        value="custom"
        v-model="chords_per_measure"
      />
      <label for="custom">Custom</label>
    </fieldset>
    <label for="playbackBpm">Playback BPM</label>
    <input id="playbackBpm" type="number" v-model.number="playback_bpm" />
    <fieldset>
      <legend>Rhythm</legend>
      <input type="radio" id="8" name="rhythm" value="8" v-model.number="base_rhythm" />
      <label for="8">Eighth Notes</label>
      <input type="radio" id="16" name="rhythm" value="16" v-model.number="base_rhythm" />
      <label for="16">Sixteenth Notes</label>
      <input type="radio" id="4" name="rhythm" value="4" v-model.number="base_rhythm" />
      <label for="4">Quarter Notes</label>
    </fieldset>
    <input type="submit" value="Continue" />
  </form>
</template>

<style scoped></style>
