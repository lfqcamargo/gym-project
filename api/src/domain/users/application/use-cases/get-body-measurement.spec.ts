import { makeBodyMeasurement } from 'test/factories/make-body-measurement'
import { InMemoryBodyMeasurementRepository } from 'test/repositories/in-memory-body-measurement-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { GetBodyMeasurementUseCase } from './get-body-measurement'

let inMemoryBodyMeasurementRepository: InMemoryBodyMeasurementRepository
let sut: GetBodyMeasurementUseCase

describe('Get Body Measurement Use Case', () => {
  beforeEach(() => {
    inMemoryBodyMeasurementRepository = new InMemoryBodyMeasurementRepository()
    sut = new GetBodyMeasurementUseCase(inMemoryBodyMeasurementRepository)
  })

  it('should be able to get body measurement by id', async () => {
    const { bodyMeasurement } = makeBodyMeasurement()
    await inMemoryBodyMeasurementRepository.create(bodyMeasurement)

    const result = await sut.execute({ id: bodyMeasurement.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ bodyMeasurement })
  })

  it('should return a ResourceNotFoundError if body measurement does not exist', async () => {
    const result = await sut.execute({ id: 'non-existing-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
