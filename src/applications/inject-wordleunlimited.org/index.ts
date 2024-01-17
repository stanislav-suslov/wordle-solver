/**
 * Source code for injection for https://wordleunlimited.org
 */

import { DICT } from '../../../dict'
import { type ItemToAdd, WordleSolver } from '../../module'
import { type Letter, type Evaluation } from '../../module/types'

async function sleep (ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function getHistory (): ItemToAdd[][] {
  return Array.from(document.querySelector('body > game-app')!.shadowRoot!.querySelectorAll('game-row')) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    .filter(gameRow => gameRow.getAttribute('letters')!.length > 0) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    .map(gameRow => {
      return Array.from(gameRow.shadowRoot!.querySelectorAll('game-tile')).map(gameTile => ({ // eslint-disable-line @typescript-eslint/no-non-null-assertion
        letter: gameTile.getAttribute('letter') as Letter,
        status: gameTile.getAttribute('evaluation')! as Evaluation // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }))
    })
}

async function guessWord (word: string): Promise<void> {
  async function printLetter (letter: string): Promise<void> {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: letter }))
  }

  async function confirmWord (): Promise<void> {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
  }

  const letters = word.split('')

  for (const letter of letters) {
    await printLetter(letter)
    await sleep(200)
  }

  await confirmWord()
  await sleep(3000)
}

void (async () => {
  const wordleSolver = new WordleSolver(DICT.SOLUTION_LIST)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const num of [0, 1, 2, 3, 4]) {
    const lastHistory = getHistory().at(-1)! // eslint-disable-line @typescript-eslint/no-non-null-assertion

    // @ts-expect-error unknown length of lastHistory
    wordleSolver.add(lastHistory)

    const { suggest, final } = wordleSolver.guess()

    if (typeof suggest === 'undefined') {
      throw new Error('No suggestions')
    }

    await guessWord(suggest)

    if (final) {
      console.log('done!')
      break
    }
  }
})()
