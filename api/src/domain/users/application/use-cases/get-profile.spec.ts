import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetProfileUseCase } from './get-profile'

let inMemoryProfilesRepository: InMemoryProfilesRepository
let sut: GetProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    sut = new GetProfileUseCase(inMemoryProfilesRepository)
  })

  it('should be able to get profile by id', async () => {
    const { profile } = makeUser()
    await inMemoryProfilesRepository.create(profile)

    const result = await sut.execute({ id: profile.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ profile })
  })

  it('should return a ResourceNotFoundError if profile does not exist', async () => {
    const result = await sut.execute({ id: 'non-existing-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
