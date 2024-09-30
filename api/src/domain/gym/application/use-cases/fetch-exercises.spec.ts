import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

import { Exercise } from '../../enterprise/entities/exercise'
import { FetchExercisesUseCase } from './fetch-exercises'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: FetchExercisesUseCase

describe('Fetch Exercises Use Case', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new FetchExercisesUseCase(inMemoryExercisesRepository)
  })

  it('should be able to fetch exercises', async () => {
    for (let c = 1; c <= 22; c++) {
      inMemoryExercisesRepository.items[c] = new Exercise({
        id: c,
        name: `teste${c}`,
        description: `teste${c}`,
      })
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.exercises).toHaveLength(10)
    }
  })
})
