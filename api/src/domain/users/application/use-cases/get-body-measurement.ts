import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyMeasurement } from '../../enterprise/entities/body-measurement'
import { BodyMeasurementRepository } from '../repositories/body-measurement-repository'

interface GetBodyMeasurementUseCaseRequest {
  id: string
}

type GetBodyMeasurementUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    bodyMeasurement: BodyMeasurement
  }
>

@Injectable()
export class GetBodyMeasurementUseCase {
  constructor(private bodyMeasurementRepository: BodyMeasurementRepository) {}

  async execute({
    id,
  }: GetBodyMeasurementUseCaseRequest): Promise<GetBodyMeasurementUseCaseResponse> {
    const bodyMeasurement = await this.bodyMeasurementRepository.findById(id)

    if (!bodyMeasurement) {
      return left(new ResourceNotFoundError())
    }

    return right({ bodyMeasurement })
  }
}
