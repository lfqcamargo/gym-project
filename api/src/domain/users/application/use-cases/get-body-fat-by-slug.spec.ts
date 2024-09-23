import { makeBodyFat } from 'test/factories/make-body-fat'
import { makeUser } from 'test/factories/make-user'
import { InMemoryBodyFatRepository } from 'test/repositories/in-memory-body-fat-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetBodyFatBySlugUseCase } from './get-body-fat-by-slug'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryBodyFatRepository: InMemoryBodyFatRepository
let sut: GetBodyFatBySlugUseCase

describe('Get Body Fat By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryBodyFatRepository = new InMemoryBodyFatRepository()
    sut = new GetBodyFatBySlugUseCase(
      inMemoryUsersRepository,
      inMemoryBodyFatRepository,
    )
  })

  it('should be able to get body fat by user slug', async () => {
    const { user } = makeUser()
    const { bodyFat } = makeBodyFat({}, user.id)

    await inMemoryUsersRepository.create(user)
    await inMemoryBodyFatRepository.create(bodyFat)

    const result = await sut.execute({ slug: user.slug.value })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ bodyfat: bodyFat })
  })

  it('should return a ResourceNotFoundError if user does not exist', async () => {
    const result = await sut.execute({ slug: 'non-existing-slug' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return a ResourceNotFoundError if body fat does not exist', async () => {
    const { user } = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({ slug: user.slug.value })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
