import { type GuessHistoryItem, getBoundaries, type Bound } from '.'

describe('getBound()', () => {
  it('returns zero without history', () => {
    const history: GuessHistoryItem[] = []

    const result = getBoundaries(history)

    const expected: Bound[] = []
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for absent character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'absent'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'avoid', 'avoid', 'avoid', 'avoid'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for present character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'present'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'find', 'find', 'find', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for correct character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'correct'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['required', undefined, undefined, undefined, undefined] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same correct and present character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'correct'
    }, {
      index: 1,
      letter: 'a',
      status: 'present'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['required', 'avoid', 'find', 'find', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same corrent and absent character ', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'absent'
    }, {
      index: 3,
      letter: 'a',
      status: 'correct'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'avoid', 'avoid', 'required', 'avoid'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same correct, present and absent character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'correct'
    }, {
      index: 1,
      letter: 'a',
      status: 'present'
    }, {
      index: 2,
      letter: 'a',
      status: 'absent'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['required', 'avoid', 'avoid', 'find', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns two rules for two different letters', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'present'
    }, {
      index: 3,
      letter: 's',
      status: 'present'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'find', 'find', 'find', 'find'] },
      { letter: 's', indexRule: ['find', 'find', 'find', 'avoid', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })
})
