import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { MuscleGroup } from '../../enterprise/entities/muscle-group'
import { MuscleGroupRepository } from '../repositories/muscle-group-repository'

interface GetMuscleGroupUseCaseRequest {
  id: number
}

type GetMuscleGroupUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    muscleGroup: MuscleGroup
  }
>

@Injectable()
export class GetMuscleGroupUseCase {
  constructor(private musclegroupRepository: MuscleGroupRepository) {}

  async execute({
    id,
  }: GetMuscleGroupUseCaseRequest): Promise<GetMuscleGroupUseCaseResponse> {
    const muscleGroup = await this.musclegroupRepository.findById(id)

    if (!muscleGroup) {
      return left(new ResourceNotFoundError())
    }

    return right({ muscleGroup })
  }
}
