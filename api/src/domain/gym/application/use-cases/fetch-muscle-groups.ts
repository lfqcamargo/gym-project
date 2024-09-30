import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { MuscleGroup } from '../../enterprise/entities/muscle-group'
import { MuscleGroupRepository } from '../repositories/muscle-group-repository'

interface FetchMuscleGroupsUseCaseRequest {
  page: number
}

type FetchMuscleGroupsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    muscleGroups: MuscleGroup[]
  }
>

@Injectable()
export class FetchMuscleGroupsUseCase {
  constructor(private muscleGroupRepository: MuscleGroupRepository) {}

  async execute({
    page,
  }: FetchMuscleGroupsUseCaseRequest): Promise<FetchMuscleGroupsUseCaseResponse> {
    const muscleGroups = await this.muscleGroupRepository.fetchAll(page)

    if (!muscleGroups) {
      return left(new ResourceNotFoundError())
    }

    return right({ muscleGroups })
  }
}
