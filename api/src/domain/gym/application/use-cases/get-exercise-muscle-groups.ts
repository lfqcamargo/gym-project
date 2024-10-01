import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { ExerciseMuscleGroups } from '../../enterprise/entities/exercise-muscle-groups'
import { ExerciseMuscleGroupsRepository } from '../repositories/exercise-muscle-groups-repository'

interface GetExerciseMuscleGroupsUseCaseRequest {
  id: number
}

type GetExerciseMuscleGroupsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    exerciseMuscleGroups: ExerciseMuscleGroups
  }
>

@Injectable()
export class GetExerciseMuscleGroupsUseCase {
  constructor(
    private exerciseMuscleGroupsRepository: ExerciseMuscleGroupsRepository,
  ) {}

  async execute({
    id,
  }: GetExerciseMuscleGroupsUseCaseRequest): Promise<GetExerciseMuscleGroupsUseCaseResponse> {
    const exerciseMuscleGroups =
      await this.exerciseMuscleGroupsRepository.findById(id)

    if (!exerciseMuscleGroups) {
      return left(new ResourceNotFoundError())
    }

    return right({ exerciseMuscleGroups })
  }
}
