import { type Letter, type LetterStatus } from '../types'

export interface GuessHistoryItem {
  index: number
  letter: Letter
  status: LetterStatus
}

export type BoundIndexRule = 'required' | 'find' | 'avoid' | undefined

export interface Bound {
  letter: Letter
  indexRule: [BoundIndexRule, BoundIndexRule, BoundIndexRule, BoundIndexRule, BoundIndexRule]
}

export function getBoundaries (
  history: GuessHistoryItem[]
): Bound[] {
  const boundaries: Bound[] = []

  const historyByLetter = history.reduce((acc, item) => {
    const key = item.letter

    if (key in acc) {
      acc[key].push(item)
    } else {
      acc[key] = [item]
    }

    acc[key]
      .sort((a) => (a.status === 'exact') ? 1 : -1)
      .sort((a) => (a.status === 'not-presented') ? -1 : 1)

    return acc
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  }, {} as Record<Letter, GuessHistoryItem[]>);

  (Object.keys(historyByLetter) as Array<keyof typeof historyByLetter>).forEach((key) => {
    const value = historyByLetter[key]

    const boundary = value.reduce<Bound['indexRule']>((acc, item, _, self) => {
      if (item.status === 'not-presented') {
        return ['avoid', 'avoid', 'avoid', 'avoid', 'avoid']
      }

      if (item.status === 'wrong-place') {
        const arr: typeof acc = ['find', 'find', 'find', 'find', 'find']
        arr[item.index] = 'avoid'

        self
          .filter(i => i.status === 'not-presented' || i.status === 'wrong-place')
          .forEach((item) => {
            arr[item.index] = 'avoid'
          })

        return arr
      }

      if (item.status === 'exact') {
        acc[item.index] = 'required'
      }

      return acc
    }, [undefined, undefined, undefined, undefined, undefined])

    boundaries.push({ letter: key, indexRule: boundary })
  })

  return boundaries
}
