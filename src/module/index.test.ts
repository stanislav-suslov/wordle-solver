import { WordleSolver } from '.'

describe('WordleSolver', () => {
  describe('suggests correctly', () => {
    it('test #1', () => {
      const solutions = ['arise', 'cigar', 'semmm', 'sommm', 'sammm']
      const wordleSolver = new WordleSolver(solutions)
      wordleSolver.add([
        { letter: 'a', status: 'present' },
        { letter: 'r', status: 'absent' },
        { letter: 'i', status: 'absent' },
        { letter: 's', status: 'present' },
        { letter: 'e', status: 'absent' }
      ])

      const result = wordleSolver.guess()

      expect(result).toBe('sammm')
    })

    it('test #2', () => {
      const solutions = ['arise', 'aiege', 'liege', 'pixie', 'cihve']
      const wordleSolver = new WordleSolver(solutions)

      wordleSolver.add([
        { letter: 'a', status: 'absent' },
        { letter: 'r', status: 'absent' },
        { letter: 'i', status: 'present' },
        { letter: 's', status: 'absent' },
        { letter: 'e', status: 'correct' }
      ])
      expect(wordleSolver.guess()).toBe('liege')

      wordleSolver.add([
        { letter: 'l', status: 'absent' },
        { letter: 'i', status: 'correct' },
        { letter: 'e', status: 'absent' },
        { letter: 'g', status: 'absent' },
        { letter: 'e', status: 'correct' }
      ])
      expect(wordleSolver.guess()).toBe('pixie')

      wordleSolver.add([
        { letter: 'p', status: 'absent' },
        { letter: 'i', status: 'correct' },
        { letter: 'x', status: 'absent' },
        { letter: 'i', status: 'absent' },
        { letter: 'e', status: 'correct' }
      ])
      expect(wordleSolver.guess()).toBe('cihve')
    })

    it('test #3', () => {
      const solutions = ['arise', 'humph', 'cluck', 'wound']
      const wordleSolver = new WordleSolver(solutions)

      wordleSolver.add([
        { letter: 'a', status: 'absent' },
        { letter: 'r', status: 'absent' },
        { letter: 'i', status: 'absent' },
        { letter: 's', status: 'absent' },
        { letter: 'e', status: 'absent' }
      ])
      expect(wordleSolver.guess()).toBe('humph')

      wordleSolver.add([
        { letter: 'h', status: 'absent' },
        { letter: 'u', status: 'present' },
        { letter: 'm', status: 'absent' },
        { letter: 'p', status: 'absent' },
        { letter: 'h', status: 'absent' }
      ])
      expect(wordleSolver.guess()).toBe('cluck')

      wordleSolver.add([
        { letter: 'c', status: 'absent' },
        { letter: 'l', status: 'absent' },
        { letter: 'u', status: 'correct' },
        { letter: 'c', status: 'absent' },
        { letter: 'k', status: 'absent' }
      ])
      expect(wordleSolver.guess()).toBe('wound')
    })
  })
})
