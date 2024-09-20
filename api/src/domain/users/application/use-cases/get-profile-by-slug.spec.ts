import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetProfileBySlugUseCase } from './get-profile-by-slug'

let inMemoryProfilesRepository: InMemoryProfilesRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetProfileBySlugUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetProfileBySlugUseCase(
      inMemoryUsersRepository,
      inMemoryProfilesRepository,
    )
  })

  it('should be able to get profile by slug', async () => {
    const { user, profile } = makeUser()
    await inMemoryUsersRepository.create(user)
    await inMemoryProfilesRepository.create(profile)

    const result = await sut.execute({ slug: user.slug.value })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ profile })
  })

  it('should return a ResourceNotFoundError if profile does not exist', async () => {
    const { profile } = makeUser()
    await inMemoryProfilesRepository.create(profile)

    const result = await sut.execute({ slug: 'non-existing-slug' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
