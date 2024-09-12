import { makeProfile } from 'test/factories/make-profile'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditProfileUseCase } from './edit-profile'

let inMemoryProfileRepository: InMemoryProfilesRepository
let sut: EditProfileUseCase

describe('EditProfileUseCase', () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfilesRepository()
    sut = new EditProfileUseCase(inMemoryProfileRepository)
  })

  it('should be able to update the profile description', async () => {
    const { profile } = makeProfile({ description: 'Old Description' })
    await inMemoryProfileRepository.create(profile)

    const result = await sut.execute({
      id: profile.id.toString(),
      description: 'New Description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProfileRepository.items[0].description).toEqual(
      'New Description',
    )
  })

  it('should be able to update the profile photo', async () => {
    const { profile } = makeProfile({ profilePhoto: Buffer.from('old_photo') })
    await inMemoryProfileRepository.create(profile)

    const newPhoto = Buffer.from('new_photo')

    const result = await sut.execute({
      id: profile.id.toString(),
      profilePhoto: newPhoto,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProfileRepository.items[0].profilePhoto).toEqual(newPhoto)
  })

  it('should be able to update the cover photo', async () => {
    const { profile } = makeProfile({ coverPhoto: Buffer.from('old_cover') })
    await inMemoryProfileRepository.create(profile)

    const newCover = Buffer.from('new_cover')

    const result = await sut.execute({
      id: profile.id.toString(),
      coverPhoto: newCover,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProfileRepository.items[0].coverPhoto).toEqual(newCover)
  })

  it('should return an error if profile does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      description: 'New Description',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
