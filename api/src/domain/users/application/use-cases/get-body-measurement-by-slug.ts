import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyMeasurement } from '../../enterprise/entities/body-measurement'
import { BodyMeasurementRepository } from '../repositories/body-measurement-repository'
import { UserRepository } from '../repositories/user-repository'

interface GetBodyMeasurementBySlugUseCaseRequest {
  slug: string
}

type GetBodyMeasurementBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    bodymeasurement: BodyMeasurement
  }
>

@Injectable()
export class GetBodyMeasurementBySlugUseCase {
  constructor(
    private userRepository: UserRepository,
    private bodymeasurementRepository: BodyMeasurementRepository,
  ) {}

  async execute({
    slug,
  }: GetBodyMeasurementBySlugUseCaseRequest): Promise<GetBodyMeasurementBySlugUseCaseResponse> {
    const user = await this.userRepository.findBySlug(slug)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const bodymeasurement = await this.bodymeasurementRepository.findById(
      user.id.toString(),
    )

    if (!bodymeasurement) {
      return left(new ResourceNotFoundError())
    }

    return right({ bodymeasurement })
  }
}
