import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Profile } from '../../enterprise/entities/profile'
import { ProfileRepository } from '../repositories/profile-repository'

interface GetProfileUseCaseRequest {
  id: string
}

type GetProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    profile: Profile
  }
>

@Injectable()
export class GetProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute({
    id,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const profile = await this.profileRepository.findById(id)

    if (!profile) {
      return left(new ResourceNotFoundError())
    }

    return right({ profile })
  }
}
