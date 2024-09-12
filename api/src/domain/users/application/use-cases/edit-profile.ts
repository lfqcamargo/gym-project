import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { ProfileRepository } from '../repositories/profile-repository'

interface EditProfileUseCaseRequest {
  id: string
  description?: string | null
  profilePhoto?: Buffer | null
  coverPhoto?: Buffer | null
}

type EditProfileUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class EditProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute({
    id,
    description,
    profilePhoto,
    coverPhoto,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const profile = await this.profileRepository.findById(id)

    if (!profile) {
      return left(new ResourceNotFoundError())
    }

    if (description) {
      profile.description = description
    }

    if (profilePhoto) {
      profile.profilePhoto = profilePhoto
    }

    if (coverPhoto) {
      profile.coverPhoto = coverPhoto
    }

    await this.profileRepository.save(profile)

    return right(null)
  }
}
