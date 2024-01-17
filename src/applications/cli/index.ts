import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { DICT } from '../../../dict'
import { WordleSolver } from '../../module'
import { type LetterStatus, type Letter } from '../../module/types'

const rl = readline.createInterface({ input, output })

function answerToItemToAdd (answer: string): Parameters<typeof WordleSolver.prototype.add>[0] {
  const [a, a1, b, b1, c, c1, d, d1, e, e1] = answer

  const numberToStatusMap: Record<string, LetterStatus> = {
    0: 'not-presented',
    1: 'wrong-place',
    2: 'exact'
  }

  return [
    { letter: a.toLowerCase() as Letter, status: numberToStatusMap[a1] },
    { letter: b.toLowerCase() as Letter, status: numberToStatusMap[b1] },
    { letter: c.toLowerCase() as Letter, status: numberToStatusMap[c1] },
    { letter: d.toLowerCase() as Letter, status: numberToStatusMap[d1] },
    { letter: e.toLowerCase() as Letter, status: numberToStatusMap[e1] }
  ]
}

void (async () => {
  const wordSolver = new WordleSolver(DICT.SOLUTION_LIST)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const i of [0, 1, 2, 3, 4]) {
    const answer = await rl.question('Result: ')

    wordSolver.add(answerToItemToAdd(answer))

    const guess = wordSolver.guess()

    if (typeof guess === 'undefined') {
      throw new Error('No words available')
    }

    if (guess.final) {
      console.log(`The answer is: "${guess.suggest}"!`)
      process.exit(0)
    } else {
      console.log(`Guess: ${guess.suggest}`)
    }
  }

  console.log('Couldn\'t find the answer :(')
  process.exit(1)
})()
