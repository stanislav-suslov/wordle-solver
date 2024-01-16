import { WordleSolver } from '.'

describe('WordleSolver', () => {
  describe('suggests correctly', () => {
    it('test #1', () => {
      const solutions = ['arise', 'cigar', 'semmm', 'sommm', 'sammm']
      const wordleSolver = new WordleSolver(solutions)
      wordleSolver.add([
        { letter: 'a', status: 'wrong-place' },
        { letter: 'r', status: 'not-presented' },
        { letter: 'i', status: 'not-presented' },
        { letter: 's', status: 'wrong-place' },
        { letter: 'e', status: 'not-presented' }
      ])

      const result = wordleSolver.guess()

      expect(result).toBe('sammm')
    })

    it('test #2', () => {
      const solutions = ['arise', 'aiege', 'liege', 'pixie', 'cihve']
      const wordleSolver = new WordleSolver(solutions)

      wordleSolver.add([
        { letter: 'a', status: 'not-presented' },
        { letter: 'r', status: 'not-presented' },
        { letter: 'i', status: 'wrong-place' },
        { letter: 's', status: 'not-presented' },
        { letter: 'e', status: 'exact' }
      ])
      expect(wordleSolver.guess()).toBe('liege')

      wordleSolver.add([
        { letter: 'l', status: 'not-presented' },
        { letter: 'i', status: 'exact' },
        { letter: 'e', status: 'not-presented' },
        { letter: 'g', status: 'not-presented' },
        { letter: 'e', status: 'exact' }
      ])
      expect(wordleSolver.guess()).toBe('pixie')

      wordleSolver.add([
        { letter: 'p', status: 'not-presented' },
        { letter: 'i', status: 'exact' },
        { letter: 'x', status: 'not-presented' },
        { letter: 'i', status: 'not-presented' },
        { letter: 'e', status: 'exact' }
      ])
      expect(wordleSolver.guess()).toBe('cihve')
    })

    it('test #3', () => {
      const solutions = ['arise', 'humph', 'cluck', 'wound']
      const wordleSolver = new WordleSolver(solutions)

      wordleSolver.add([
        { letter: 'a', status: 'not-presented' },
        { letter: 'r', status: 'not-presented' },
        { letter: 'i', status: 'not-presented' },
        { letter: 's', status: 'not-presented' },
        { letter: 'e', status: 'not-presented' }
      ])
      expect(wordleSolver.guess()).toBe('humph')

      wordleSolver.add([
        { letter: 'h', status: 'not-presented' },
        { letter: 'u', status: 'wrong-place' },
        { letter: 'm', status: 'not-presented' },
        { letter: 'p', status: 'not-presented' },
        { letter: 'h', status: 'not-presented' }
      ])
      expect(wordleSolver.guess()).toBe('cluck')

      wordleSolver.add([
        { letter: 'c', status: 'not-presented' },
        { letter: 'l', status: 'not-presented' },
        { letter: 'u', status: 'exact' },
        { letter: 'c', status: 'not-presented' },
        { letter: 'k', status: 'not-presented' }
      ])
      expect(wordleSolver.guess()).toBe('wound')
    })
  })
})
