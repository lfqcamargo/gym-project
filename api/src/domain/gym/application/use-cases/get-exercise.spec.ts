import { InMemoryExercisesRepository } from 'test/repositories/in-memory-exercises-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Exercise } from '../../enterprise/entities/exercise'
import { GetExerciseUseCase } from './get-exercise'

let inMemoryExercisesRepository: InMemoryExercisesRepository
let sut: GetExerciseUseCase

describe('Get Exercise Use Case', () => {
  beforeEach(() => {
    inMemoryExercisesRepository = new InMemoryExercisesRepository()
    sut = new GetExerciseUseCase(inMemoryExercisesRepository)
  })

  it('should be able to get exercise by id', async () => {
    inMemoryExercisesRepository.items[0] = new Exercise({
      id: 1,
      name: 'Squat',
      description: 'teste',
    })

    const result = await sut.execute({ id: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      exercise: inMemoryExercisesRepository.items[0],
    })
  })

  it('should return a ResourceNotFoundError if exercise does not exist', async () => {
    const result = await sut.execute({ id: 2 })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
