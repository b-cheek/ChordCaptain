import type { ExerciseOptions } from "@/models/exerciseTypes"
import { useExerciseStore } from "@/stores/exercise"
import abcjs from 'abcjs'
import { Chord, AbcNotation, Note, Core, Interval } from 'tonal'

export const writeAbc = (localExercise: ExerciseOptions, chordStringList: string[]) => {
  let abcString = `
X: 1
T: ${localExercise.exerciseName}
K: ${localExercise.keyTonic}${localExercise.keyMode == 'minor' ? 'm' : ''}
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
  // This way makes chord.notes include the octave 
  // const chordList = chordStringList.map(chordString => Chord.getChord(Chord.get(chordString).aliases[0], Chord.get(chordString).tonic + "4"))
  console.log(chordList)
  // console.log(chordList.map(chord => chord.notes.map(note => AbcNotation.scientificToAbcNotation(note)))) // remove the octave from the note
  console.log((Interval.distance('D4', 'D3')))
  console.log(Note.transpose('D4', '-P8'))
  let ascending = true
  let lastNote = 'C4'
  let lastChord = Chord.get('A4')
  let noteIndex = 0
  let note
  let newNoteIndex
  let newNoteDistance

  for (let i=0; i < chordStringList.length; i++) {
    if (chordList[i].symbol && chordList[i].symbol != lastChord.symbol) {
      // Find closest note of new chord to last note
      if (ascending) {
        newNoteDistance = 13 // Greater than octave, practical infinity
        for (let j=0; j<chordList[i].notes.length; j++) {
          let checkDistance = Interval.semitones(Interval.distance(lastNote, chordList[i].notes[j]))
          if (checkDistance < newNoteDistance && checkDistance > 0) { // >0 since don't want duplicate
            newNoteIndex = j
            newNoteDistance = checkDistance
          }
        }
      }
      else { // When descending we'll find the greatest interval, which will be the closest in the other direction
        newNoteDistance = -1 // 
        for (let j=0; j<chordList[i].notes.length; j++) {
          let checkDistance = Interval.semitones(Interval.distance(lastNote, chordList[i].notes[j]))
          if (checkDistance > newNoteDistance) { // the >0 check is no longer needed since we're looking for the greatest interval
            newNoteIndex = j
            newNoteDistance = checkDistance
          }
        }

      }
      noteIndex = newNoteIndex
      lastChord = chordList[i]
    }

    else {
      if (ascending) {
        noteIndex++
        if (noteIndex>=lastChord.notes.length) { // I'm not using mod later because I might want to add some other conditions with octaves in this case depending on implementation
          noteIndex = 0
        }
      }
      else {
        noteIndex--
        if (noteIndex<0) {
          noteIndex = lastChord.notes.length-1
        }
      }
    }
    // Uses the transpose function so octaves are handled automatically
    let temp = Note.transpose(lastNote, Interval.distance(lastNote, lastChord.notes[noteIndex!]))
    if (!ascending) temp = Note.transpose(temp, '-8P') // If descending, transpose down an octave as explained above
    if (Interval.distance(temp, topNote)[0] == '-' || Interval.distance(bottomNote, temp)[0] == '-') {
      i--
      noteIndex += ascending ? -1 : 1
      ascending = !ascending
      continue
    }
    lastNote = temp
    note = AbcNotation.scientificToAbcNotation(lastNote)

    abcString += `${chordStringList[i] && `"${chordStringList[i]}"`}${note || 'sB0'} ` // use short circuiting to only add the chord if it exists
    if ((i+1)%meterNumerator == 0) {
      abcString += "|"
    }
  }
  abcString += "|"


  console.log(abcString)
  return abcString
}

const clickHandler = (abcelem: any, tuneNumber: number, classes: string, analysis: any, drag: any) => {
  console.log("abcelem:", abcelem, "\ntuneNumber:", tuneNumber, "\nclasses:", classes, "\nanalysis:", analysis, "\ndrag:", drag)
  const classList = classes.split(' ')
  console.log(classList[5], classList[7])
  const exercise = useExerciseStore()
  const index = Number(classList[5].slice(8))*Number(exercise.meter.split('/')[0]) + Number(classList[7].slice(7))
  exercise.selectedChordIndex = index
}

export const loadAbc = (target: string, abcString: string) => {
  return abcjs.renderAbc(target, abcString, {
    wrap: {
      minSpacing: 1.8, // Values from docs: https://paulrosen.github.io/abcjs/visual/render-abc-options.html#wrap
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4,
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
    add_classes: true,
  })
}

export class chordList {
  list: string[]

  constructor(exercise?: ExerciseOptions) {
    if (exercise) this.list = new Array(exercise.numMeasures * Number(exercise.meter.split('/')[0])).fill('')
    else this.list = []
  }
}