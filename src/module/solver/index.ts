import { type Letter, type Evaluation } from '../types'

export interface GuessHistoryItem {
  index: number
  letter: Letter
  status: Evaluation
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
      .sort((a) => (a.status === 'correct') ? 1 : -1)
      .sort((a) => (a.status === 'absent') ? -1 : 1)

    return acc
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  }, {} as Record<Letter, GuessHistoryItem[]>);

  (Object.keys(historyByLetter) as Array<keyof typeof historyByLetter>).forEach((key) => {
    const value = historyByLetter[key]

    const boundary = value.reduce<Bound['indexRule']>((acc, item, _, self) => {
      if (item.status === 'absent') {
        return ['avoid', 'avoid', 'avoid', 'avoid', 'avoid']
      }

      if (item.status === 'present') {
        const arr: typeof acc = ['find', 'find', 'find', 'find', 'find']
        arr[item.index] = 'avoid'

        self
          .filter(i => i.status === 'absent' || i.status === 'present')
          .forEach((item) => {
            arr[item.index] = 'avoid'
          })

        return arr
      }

      if (item.status === 'correct') {
        acc[item.index] = 'required'
      }

      return acc
    }, [undefined, undefined, undefined, undefined, undefined])

    boundaries.push({ letter: key, indexRule: boundary })
  })

  return boundaries
}
