import { type GuessHistoryItem, getBoundaries, type Bound } from '.'

describe('getBound()', () => {
  it('returns zero without history', () => {
    const history: GuessHistoryItem[] = []

    const result = getBoundaries(history)

    const expected: Bound[] = []
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for non existing character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'not-presented'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'avoid', 'avoid', 'avoid', 'avoid'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for wrong place character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'wrong-place'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'find', 'find', 'find', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for exact character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'exact'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['required', undefined, undefined, undefined, undefined] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same exact and wrong-place character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'exact'
    }, {
      index: 1,
      letter: 'a',
      status: 'wrong-place'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['required', 'avoid', 'find', 'find', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same exact and wrong-place character ', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'not-presented'
    }, {
      index: 3,
      letter: 'a',
      status: 'exact'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'avoid', 'avoid', 'required', 'avoid'] }
    ]
    expect(result).toStrictEqual(expected)
  })

  it('returns rule for same exact, wrong-place and non-existing character', () => {
    const history: GuessHistoryItem[] = [{
      index: 0,
      letter: 'a',
      status: 'exact'
    }, {
      index: 1,
      letter: 'a',
      status: 'wrong-place'
    }, {
      index: 2,
      letter: 'a',
      status: 'not-presented'
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
      status: 'wrong-place'
    }, {
      index: 3,
      letter: 's',
      status: 'wrong-place'
    }]

    const result = getBoundaries(history)

    const expected: Bound[] = [
      { letter: 'a', indexRule: ['avoid', 'find', 'find', 'find', 'find'] },
      { letter: 's', indexRule: ['find', 'find', 'find', 'avoid', 'find'] }
    ]
    expect(result).toStrictEqual(expected)
  })
})
