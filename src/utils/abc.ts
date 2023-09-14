import type { ExerciseOptions } from "@/models/exerciseTypes"
import { useExerciseStore } from "@/stores/exercise"
import abcjs from 'abcjs'

export const writeAbc = (localExercise: ExerciseOptions, chordList: string[]) => {
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

  for (let i=0; i < chordList.length; i++) {
    abcString += `${chordList[i] && `"${chordList[i]}"`}sB0 `
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
  exercise.chords.list[index] = "Bb7"
  
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