import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import { DICT } from '../../../dict'
import { type ItemToAdd, WordleSolver } from '../../module'
import { type Evaluation, type Letter } from '../../module/types'

const rl = readline.createInterface({ input, output })

function answerToItemToAdd (answer: string): ItemToAdd[] {
  const numberToEvaluationMap: Record<string, Evaluation> = {
    0: 'absent',
    1: 'present',
    2: 'correct'
  }

  return answer.split('').reduce<ItemToAdd[]>((acc, letter, index, self) => {
    if (index % 2 === 0) {
      acc.push({
        letter: letter as Letter,
        status: numberToEvaluationMap[self[index + 1]]
      })
    }

    return acc
  }, [])
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
