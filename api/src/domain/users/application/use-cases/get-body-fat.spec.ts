import { makeBodyFat } from 'test/factories/make-body-fat'
import { InMemoryBodyFatRepository } from 'test/repositories/in-memory-body-fat-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetBodyFatUseCase } from './get-body-fat'

let inMemoryBodyFatRepository: InMemoryBodyFatRepository
let sut: GetBodyFatUseCase

describe('Get Body Fat Use Case', () => {
  beforeEach(() => {
    inMemoryBodyFatRepository = new InMemoryBodyFatRepository()
    sut = new GetBodyFatUseCase(inMemoryBodyFatRepository)
  })

  it('should be able to get body fat by id', async () => {
    const { bodyFat } = makeBodyFat()
    await inMemoryBodyFatRepository.create(bodyFat)

    const result = await sut.execute({ id: bodyFat.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ bodyFat })
  })

  it('should return a ResourceNotFoundError if body fat does not exist', async () => {
    const result = await sut.execute({ id: 'non-existing-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
