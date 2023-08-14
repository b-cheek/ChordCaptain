<script setup lang="ts">
// Routing here is programmatic to tie it to the submission of the form
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import pb from '@/database/db'

const router = useRouter()
const exerciseName = ref('')

async function submit() {
  const record = await pb.collection('exercises').create({
    title: exerciseName.value
  })
  router.push(`/exercise/${exerciseName.value}`)
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="exerciseName">Name</label>
    <input id="exerciseName" type="text" v-model="exerciseName" />
    <fieldset>
      <legend>Clef</legend>
      <input type="radio" id="treble" name="clef" />
      <label for="treble">Treble</label>
      <input type="radio" id="bass" name="clef" />
      <label for="bass">Bass</label>
      <input type="radio" id="grandStaff" name="clef" />
      <label for="grandStaff">Grand Staff</label>
    </fieldset>
    <label for="numMeasures">Number of Measures</label>
    <input id="numMeasures" type="number" />
    <label for="keySignature">Key Signature</label>
    <select id="keySignature">
      <option value="4/4">4/4</option>
      <option value="3/4">3/4</option>
      <option value="2/4">2/4</option>
      <option value="2/2">2/2</option>
      <option value="5/4">5/4</option>
    </select>
    <fieldset>
      <legend>Range</legend>
      <label for="bottomNote">Bottom Note</label>
      <input id="bottomNote" type="text" />
      <label for="topNote">Top Note</label>
      <input id="topNote" type="text" />
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
      <input type="radio" id="stepwise" name="exerciseType" />
      <label for="stepwise">Stepwise</label>
      <input type="radio" id="arpeggiated" name="exerciseType" />
      <label for="arpeggiated">Arpeggiated</label>
      <input type="radio" id="mixed" name="exerciseType" />
      <label for="mixed">Mixed</label>
    </fieldset>
    <fieldset>
      <legend>Chords Per Measure</legend>
      <input type="radio" id="one" name="chordsPerMeasure" />
      <label for="one">1</label>
      <input type="radio" id="two" name="chordsPerMeasure" />
      <label for="two">2</label>
      <input type="radio" id="custom" name="chordsPerMeasure" />
      <label for="custom">Custom</label>
    </fieldset>
    <label for="playbackBpm">Playback BPM</label>
    <input id="playbackBpm" type="number" />
    <fieldset>
      <legend>Rhythm</legend>
      <input type="radio" id="eighth" name="rhythm" />
      <label for="eighth">Eighth Notes</label>
      <input type="radio" id="sixteenth" name="rhythm" />
      <label for="sixteenth">Sixteenth Notes</label>
      <input type="radio" id="quarter" name="rhythm" />
      <label for="quarter">Quarter Notes</label>
    </fieldset>
    <input type="submit" value="Continue" />
  </form>
</template>

<style scoped></style>
