import { InMemoryMuscleGroupsRepository } from 'test/repositories/in-memory-muscle-groups-repository'

import { MuscleGroup } from '../../enterprise/entities/muscle-group'
import { FetchMuscleGroupsUseCase } from './fetch-muscle-groups'

let inMemoryMuscleGroupsRepository: InMemoryMuscleGroupsRepository
let sut: FetchMuscleGroupsUseCase

describe('Fetch Muscle Groups Use Case', () => {
  beforeEach(() => {
    inMemoryMuscleGroupsRepository = new InMemoryMuscleGroupsRepository()
    sut = new FetchMuscleGroupsUseCase(inMemoryMuscleGroupsRepository)
  })

  it('should be able to fetch all muscle groups', async () => {
    for (let c = 1; c <= 22; c++) {
      inMemoryMuscleGroupsRepository.items[c] = new MuscleGroup({
        id: c,
        description: `teste${c}`,
      })
    }

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.muscleGroups).toHaveLength(10)
    }
  })
})
