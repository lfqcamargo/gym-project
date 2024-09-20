import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Profile } from '../../enterprise/entities/profile'
import { ProfileRepository } from '../repositories/profile-repository'
import { UserRepository } from '../repositories/user-repository'

interface GetProfileBySlugUseCaseRequest {
  slug: string
}

type GetProfileBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    profile: Profile
  }
>

@Injectable()
export class GetProfileBySlugUseCase {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
  ) {}

  async execute({
    slug,
  }: GetProfileBySlugUseCaseRequest): Promise<GetProfileBySlugUseCaseResponse> {
    const user = await this.userRepository.findBySlug(slug)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const profile = await this.profileRepository.findById(user.id.toString())

    if (!profile) {
      return left(new ResourceNotFoundError())
    }

    return right({ profile })
  }
}
