import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Exercise } from '../../enterprise/entities/exercise'
import { ExerciseRepository } from '../repositories/exercise-repository'

interface GetExerciseUseCaseRequest {
  id: number
}

type GetExerciseUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    exercise: Exercise
  }
>

@Injectable()
export class GetExerciseUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    id,
  }: GetExerciseUseCaseRequest): Promise<GetExerciseUseCaseResponse> {
    const exercise = await this.exerciseRepository.findById(id)

    if (!exercise) {
      return left(new ResourceNotFoundError())
    }

    return right({ exercise })
  }
}
