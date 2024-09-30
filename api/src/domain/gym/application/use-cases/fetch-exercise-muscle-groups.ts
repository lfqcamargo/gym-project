import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { ExerciseMuscleGroups } from '../../enterprise/entities/exercise-muscle-groups'
import { ExerciseMuscleGroupsRepository } from '../repositories/exercise-muscle-groups-repository'

interface FetchExerciseMuscleGroupsUseCaseRequest {
  id: number
}

type FetchExerciseMuscleGroupsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    exerciseMuscleGroups: ExerciseMuscleGroups[]
  }
>

@Injectable()
export class FetchExerciseMuscleGroupsUseCase {
  constructor(
    private exerciseMuscleGroupsRepository: ExerciseMuscleGroupsRepository,
  ) {}

  async execute({
    id,
  }: FetchExerciseMuscleGroupsUseCaseRequest): Promise<FetchExerciseMuscleGroupsUseCaseResponse> {
    const exerciseMuscleGroups =
      await this.exerciseMuscleGroupsRepository.findById(id)

    if (!exerciseMuscleGroups) {
      return left(new ResourceNotFoundError())
    }

    return right({ exerciseMuscleGroups })
  }
}
