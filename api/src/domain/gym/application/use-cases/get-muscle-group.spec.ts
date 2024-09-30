import { InMemoryMuscleGroupsRepository } from 'test/repositories/in-memory-muscle-groups-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { MuscleGroup } from '../../enterprise/entities/muscle-group'
import { GetMuscleGroupUseCase } from './get-muscle-group'

let inMemoryMuscleGroupsRepository: InMemoryMuscleGroupsRepository
let sut: GetMuscleGroupUseCase

describe('Get Muscle Group Use Case', () => {
  beforeEach(() => {
    inMemoryMuscleGroupsRepository = new InMemoryMuscleGroupsRepository()
    sut = new GetMuscleGroupUseCase(inMemoryMuscleGroupsRepository)
  })

  it('should be able to get muscle group by id', async () => {
    inMemoryMuscleGroupsRepository.items[0] = new MuscleGroup({
      id: 1,
      description: 'teste',
    })

    const result = await sut.execute({ id: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      musclegroup: inMemoryMuscleGroupsRepository.items[0],
    })
  })

  it('should return a ResourceNotFoundError if muscle group does not exist', async () => {
    const result = await sut.execute({ id: 2 })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
