import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyFat } from '../../enterprise/entities/body-fat'
import { BodyFatRepository } from '../repositories/body-fat-repository'

interface GetBodyFatUseCaseRequest {
  id: string
}

type GetBodyFatUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    bodyFat: BodyFat
  }
>

@Injectable()
export class GetBodyFatUseCase {
  constructor(private bodyFatRepository: BodyFatRepository) {}

  async execute({
    id,
  }: GetBodyFatUseCaseRequest): Promise<GetBodyFatUseCaseResponse> {
    const bodyFat = await this.bodyFatRepository.findById(id)

    if (!bodyFat) {
      return left(new ResourceNotFoundError())
    }

    return right({ bodyFat })
  }
}
