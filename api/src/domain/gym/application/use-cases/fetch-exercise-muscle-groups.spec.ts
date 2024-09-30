import { InMemoryExerciseMuscleGroupsRepository } from 'test/repositories/in-memory-exercise-muscle-groups-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { ExerciseMuscleGroups } from '../../enterprise/entities/exercise-muscle-groups'
import { FetchExerciseMuscleGroupsUseCase } from './fetch-exercise-muscle-groups'

let inMemoryExerciseMuscleGroupsRepository: InMemoryExerciseMuscleGroupsRepository
let sut: FetchExerciseMuscleGroupsUseCase

describe('Fetch ExerciseMuscleGroups Use Case', () => {
  beforeEach(() => {
    inMemoryExerciseMuscleGroupsRepository =
      new InMemoryExerciseMuscleGroupsRepository()
    sut = new FetchExerciseMuscleGroupsUseCase(
      inMemoryExerciseMuscleGroupsRepository,
    )
  })

  it('should be able to fetch exercise muscle groups by id', async () => {
    inMemoryExerciseMuscleGroupsRepository.items[0] = new ExerciseMuscleGroups({
      id: 1,
      exerciseId: 1,
      muscleGroupId: 1,
      muscleActivation: 1,
    })

    inMemoryExerciseMuscleGroupsRepository.items[1] = new ExerciseMuscleGroups({
      id: 1,
      exerciseId: 1,
      muscleGroupId: 2,
      muscleActivation: 2,
    })

    inMemoryExerciseMuscleGroupsRepository.items[2] = new ExerciseMuscleGroups({
      id: 1,
      exerciseId: 2,
      muscleGroupId: 1,
      muscleActivation: 1,
    })

    const result = await sut.execute({ id: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.exerciseMuscleGroups).toHaveLength(3)
    }
  })

  it('should return a ResourceNotFoundError if exercise muscle groups does not exist', async () => {
    const result = await sut.execute({ id: 2 })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
