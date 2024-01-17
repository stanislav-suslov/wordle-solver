import { getBoundaries, type GuessHistoryItem } from './solver'
import { type Letter, type Evaluation } from './types'

export interface ItemToAdd {
  letter: Letter
  status: Evaluation
}

function getAlphabet (): Letter[] {
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
}

export class WordleSolver {
  private readonly history: GuessHistoryItem[] = []

  constructor (
    private readonly solutions: string[]
  ) {}

  add (letters: ItemToAdd[]): void {
    const newHistory = letters.map<GuessHistoryItem>((letter, index) => ({
      index,
      letter: letter.letter,
      status: letter.status
    }))

    const indexesToRemove: number[] = []

    this.history.forEach((historyItem, index) => {
      if (historyItem.status === 'present') {
        if (newHistory.findIndex(i => historyItem.letter === i.letter && i.status === 'correct') !== -1) {
          indexesToRemove.push(index)
        }
      }
    })

    indexesToRemove.sort((a, b) => b - a).forEach(index => {
      this.history.splice(index, 1)
    })

    this.history.push(...newHistory)
  }

  guess (): { suggest: string | undefined, final: boolean } {
    const available = new Array(5).fill(null).map(() => getAlphabet())

    const boundaries = getBoundaries(this.history)

    boundaries.forEach(boundary => {
      const letter = boundary.letter

      boundary.indexRule.forEach((rule, index) => {
        if (rule === 'avoid') {
          const availableIndex = available[index].indexOf(letter)

          if (availableIndex !== -1) {
            available[index].splice(availableIndex, 1)
          }
        } else if (rule === 'required') {
          available[index] = [letter]
        }
      })
    })

    const answers = this.solutions
      .filter(solution => {
        return solution.split('').every((letter, index) => {
          return available[index].includes(letter as Letter)
        })
      })
      .filter(solution => {
        return boundaries
          .filter(boundary => boundary.indexRule.some(i => i === 'find'))
          .every(boundary => boundary.indexRule.some((_, index) => solution[index] === boundary.letter))
      })

    return {
      suggest: answers.at(0),
      final: answers.length === 1
    }
  }
}
