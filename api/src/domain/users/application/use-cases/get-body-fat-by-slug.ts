import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyFat } from '../../enterprise/entities/body-fat'
import { BodyFatRepository } from '../repositories/body-fat-repository'
import { UserRepository } from '../repositories/user-repository'

interface GetBodyFatBySlugUseCaseRequest {
  slug: string
}

type GetBodyFatBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    bodyfat: BodyFat
  }
>

@Injectable()
export class GetBodyFatBySlugUseCase {
  constructor(
    private userRepository: UserRepository,
    private bodyfatRepository: BodyFatRepository,
  ) {}

  async execute({
    slug,
  }: GetBodyFatBySlugUseCaseRequest): Promise<GetBodyFatBySlugUseCaseResponse> {
    const user = await this.userRepository.findBySlug(slug)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const bodyfat = await this.bodyfatRepository.findById(user.id.toString())

    if (!bodyfat) {
      return left(new ResourceNotFoundError())
    }

    return right({ bodyfat })
  }
}
