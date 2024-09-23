import { makeBodyMeasurement } from 'test/factories/make-body-measurement'
import { makeUser } from 'test/factories/make-user'
import { InMemoryBodyMeasurementRepository } from 'test/repositories/in-memory-body-measurement-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetBodyMeasurementBySlugUseCase } from './get-body-measurement-by-slug'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryBodyMeasurementRepository: InMemoryBodyMeasurementRepository
let sut: GetBodyMeasurementBySlugUseCase

describe('Get Body Measurement By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryBodyMeasurementRepository = new InMemoryBodyMeasurementRepository()
    sut = new GetBodyMeasurementBySlugUseCase(
      inMemoryUsersRepository,
      inMemoryBodyMeasurementRepository,
    )
  })

  it('should be able to get body measurement by user slug', async () => {
    const { user } = makeUser()
    const { bodyMeasurement } = makeBodyMeasurement({}, user.id)

    await inMemoryUsersRepository.create(user)
    await inMemoryBodyMeasurementRepository.create(bodyMeasurement)

    const result = await sut.execute({ slug: user.slug.value })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ bodymeasurement: bodyMeasurement })
  })

  it('should return a ResourceNotFoundError if user does not exist', async () => {
    const result = await sut.execute({ slug: 'non-existing-slug' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return a ResourceNotFoundError if body measurement does not exist', async () => {
    const { user } = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({ slug: user.slug.value })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
