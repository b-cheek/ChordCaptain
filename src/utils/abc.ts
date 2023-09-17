import type { ExerciseOptions } from '@/models/exerciseTypes'
import { useExerciseStore } from '@/stores/exercise'
import abcjs from 'abcjs'
import { Chord, AbcNotation, Note, Interval, Key, Scale } from 'tonal'
import { keyFlats, keySharps } from './applicationConstants'

export const writeAbc = (localExercise: ExerciseOptions, chordStringList: string[]) => {
  let abcString = `
X: 1
T: ${localExercise.exerciseName}
K: ${localExercise.keyTonic}${localExercise.keyMode == 'minor' ? 'm' : ''}
K: clef=${localExercise.clef}
M: ${localExercise.meter}
L: ${localExercise.baseRhythm}
U: s=!style=rhythm!
`
  // for (let i = 0; i < localExercise.numMeasures; i++) {
  //   for (let j = 0; j < Number(localExercise.meter.split('/')[0]); j++) {
  //       abcString += `sB0 `
  //   }
  //   abcString += "|"
  // }
  // abcString += "|"

  const meterNumerator = Number(localExercise.meter.split('/')[0])
  const bottomNote = localExercise.bottomNote
  const topNote = localExercise.topNote
  const chordList = chordStringList.map(chordString => Chord.get(chordString))
  const scaleList = (localExercise.exerciseType == 'stepwise') 
    ? chordList.map(chord => Scale.get(`${chord.tonic} ${Chord.chordScales(chord.symbol)[0]}`))
    : []
  const stepwise = localExercise.exerciseType == 'stepwise'
  const alterations = (
    localExercise.keyMode == 'major'
      ? Key.majorKey(localExercise.keyTonic)
      : Key.minorKey(localExercise.keyTonic)
  ).alteration
  const keyAccidentals = new Set(
    alterations <= 0 ? keyFlats.slice(0, -alterations) : keySharps.slice(0, alterations)
  )
  const notesPerBeat = Number(localExercise.baseRhythm.split('/')[1])/4
  // This way makes chord.notes include the octave
  console.log(Scale.get('Bb ' + Chord.chordScales('Bb7')[0]))
  console.log(Chord.get("Bb7"))

  let ascending = true
  let lastNote = 'C4'
  let lastChord = (stepwise) ? Scale.get('A major') : Chord.get('A7')
  let noteIndex = 0
  let note
  let newNoteIndex
  let curChord
  let accidentals = keyAccidentals // Used to track accidentals by measure, remove courtesy accidentals

  console.log(accidentals)

  let hasChord = false // False until first chord, use slashes until then

  for (let i = 0; i < chordStringList.length; i++) {
    if (chordStringList[i]) hasChord = true
    for (let j = 0; j < Number(notesPerBeat) && hasChord; j++) { // hasChord so slashes are only on quarter notes
      curChord = (stepwise) ? scaleList[i] : chordList[i]
      if (curChord.name && curChord.name != lastChord.name) {
        // Find closest note of new chord to last note
        newNoteIndex = findNearestNote(lastNote, 
          (stepwise
            ? scaleList 
            : chordList)
        [i].notes, ascending)
        noteIndex = newNoteIndex
      } else {
        if (ascending) {
          noteIndex++
          if (noteIndex >= lastChord.notes.length) {
            // I'm not using mod later because I might want to add some other conditions with octaves in this case depending on implementation
            noteIndex = 0
          }
        } else {
          noteIndex--
          if (noteIndex < 0) {
            noteIndex = lastChord.notes.length - 1
          }
        }
      }
      // TODO: repetition of some of these if statements feels unnecessary
      let newNote = (curChord.name ? curChord : lastChord).notes[noteIndex]
      let keyNote // The note without any accidentals earlier in the measure or in the key
      console.log(newNote)
      // if (accidentals.has(newNote)) {
      //   newNote = newNote.substring(0, -1) // Remove the accidental
      // }
      // else if (['b', '#'].includes(newNote.slice(-1))) { // If note has accidental
      //   accidentals.add(newNote)
      // }
      // Uses the transpose function so octaves are handled automatically
      let temp = Note.transpose(lastNote, Interval.distance(lastNote, newNote))
      if (!ascending) temp = Note.transpose(temp, '-8P') // If descending, transpose down an octave as explained above
      if (
        Interval.distance(temp, topNote)[0] == '-' ||
        Interval.distance(bottomNote, temp)[0] == '-'
      ) {
        // If the new note is outside the range
        j-- // redo this iteration
        noteIndex += ascending ? -1 : 1
        // Note to self: figure out how to do this better
        if (noteIndex >= lastChord.notes.length) {
          // I'm not using mod later because I might want to add some other conditions with octaves in this case depending on implementation
          noteIndex = 0
        } else if (noteIndex < 0) {
          noteIndex = lastChord.notes.length - 1
        }
        ascending = !ascending
        continue
      }
      lastNote = temp
      if (curChord.name) lastChord = curChord
      note = AbcNotation.scientificToAbcNotation(lastNote)

      abcString += `${(j==0) // Check that it is a downbeat
        ? chordStringList[i] && `"${chordStringList[i]}"` 
        : ''}`
      abcString += `${note}`
      abcString += `${j == notesPerBeat - 1 ? ' ' : ''}` // Beam notes in same beat
      // abcString += `"${i} ${j}"${note || 'sB0'}` // Show beat and sub beat for debugging
      if ((i + 1) % meterNumerator == 0 && j == notesPerBeat - 1) {
        abcString += '|'
        accidentals = keyAccidentals
      }
    }
    if (!hasChord) { // Generate slashes if no chord
      abcString += `s${(localExercise.clef == 'bass' ? 'D,0' : 'B0')}0 `
      if ((i + 1) % meterNumerator == 0) {
        abcString += '|'
      }
    }
  }
  abcString += '|'

  console.log(abcString)
  return abcString
}

const findNearestNote = (lastNote: string, options: string[], ascending: boolean) => {
  let newNoteDistance = ascending ? 13 : -1 // practical infinity
  let newNoteIndex = -1
  let checkDistance
  for (let i = 0; i < options.length; i++) {
    checkDistance = Interval.semitones(Interval.distance(lastNote, options[i]))
    if (!checkDistance) continue // Moved the duplicate check here to ensure checkDistance is defined
    if (
      (ascending && checkDistance < newNoteDistance) ||
      (!ascending && checkDistance > newNoteDistance)
    ) {
      // When descending we find the greatest interval, since this will be smallest in the descending direction.
      newNoteIndex = i
      newNoteDistance = checkDistance
    }
  }
  return newNoteIndex
}

const clickHandler = (
  abcelem: any,
  tuneNumber: number,
  classes: string,
  analysis: any,
  drag: any
) => {
  console.log(
    'abcelem:',
    abcelem,
    '\ntuneNumber:',
    tuneNumber,
    '\nclasses:',
    classes,
    '\nanalysis:',
    analysis,
    '\ndrag:',
    drag
  )
  const classList = classes.split(' ')
  console.log(classList[5], classList[7])
  const exercise = useExerciseStore()
  const index =
    Number(classList[5].slice(8)) * Number(exercise.meter.split('/')[0]) +
    Number(classList[7].slice(7))
  exercise.selectedChordIndex = index
}

export const loadAbc = (target: string, abcString: string) => {
  return abcjs.renderAbc(target, abcString, {
    wrap: {
      minSpacing: 1.8, // Values from docs: https://paulrosen.github.io/abcjs/visual/render-abc-options.html#wrap
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    },
    // Staffwidth MUST be set for wrap to work. It is overridden by the responsive option.
    // Also note that we are guaranteeing that 'exerciseContainer' is mounted by using onMounted
    staffwidth: document.getElementById('exerciseContainer')!.clientWidth * 0.95,
    responsive: 'resize',
    // oneSvgPerLine: true,  // turning this on helps some stuff, but messes up showDebug
    // showDebug: ['grid', 'box'],
    // selectTypes: [],
    jazzchords: true,
    clickListener: clickHandler,
    add_classes: true
  })
}

export class chordList {
  list: string[]

  constructor(exercise?: ExerciseOptions) {
    if (exercise)
      this.list = new Array(exercise.numMeasures * Number(exercise.meter.split('/')[0])).fill('')
    else this.list = []
  }
}
