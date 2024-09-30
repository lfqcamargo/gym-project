import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Exercise } from '../../enterprise/entities/exercise'
import { ExerciseRepository } from '../repositories/exercise-repository'

interface FetchExercisesUseCaseRequest {
  page: number
}

type FetchExercisesUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    exercises: Exercise[]
  }
>

@Injectable()
export class FetchExercisesUseCase {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async execute({
    page,
  }: FetchExercisesUseCaseRequest): Promise<FetchExercisesUseCaseResponse> {
    const exercises = await this.exerciseRepository.fetchAll(page)

    if (!exercises) {
      return left(new ResourceNotFoundError())
    }

    return right({ exercises })
  }
}
