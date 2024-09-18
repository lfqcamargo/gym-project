import { makeBodyFat } from 'test/factories/make-body-fat'
import { InMemoryBodyFatRepository } from 'test/repositories/in-memory-body-fat-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditBodyFatUseCase } from './edit-body-fat'

let inMemoryBodyFatRepository: InMemoryBodyFatRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditBodyFatUseCase

describe('EditBodyFatUseCase', () => {
  beforeEach(() => {
    inMemoryBodyFatRepository = new InMemoryBodyFatRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditBodyFatUseCase(
      inMemoryBodyFatRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to update the subscapular measurement', async () => {
    const { bodyFat } = makeBodyFat({ subscapular: 10 })
    await inMemoryBodyFatRepository.create(bodyFat)

    const result = await sut.execute({
      id: bodyFat.id.toString(),
      subscapular: 12,
      triceps: bodyFat.triceps,
      biceps: bodyFat.biceps,
      chest: bodyFat.chest,
      midAxillary: bodyFat.midAxillary,
      suprailiac: bodyFat.suprailiac,
      abdominal: bodyFat.abdominal,
      medialThigh: bodyFat.medialThigh,
      medialCalf: bodyFat.medialCalf,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBodyFatRepository.items[0].subscapular).toEqual(12)
  })

  it('should return an error if body fat measurement does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      subscapular: 12,
      triceps: 10,
      biceps: 8,
      chest: 15,
      midAxillary: 9,
      suprailiac: 11,
      abdominal: 14,
      medialThigh: 13,
      medialCalf: 7,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should create a new body fat measurement if the user exists but measurement does not', async () => {
    const { bodyFat } = makeBodyFat()
    await inMemoryBodyFatRepository.create(bodyFat)

    const result = await sut.execute({
      id: bodyFat.id.toString(),
      subscapular: 12,
      triceps: 10,
      biceps: 8,
      chest: 15,
      midAxillary: 9,
      suprailiac: 11,
      abdominal: 14,
      medialThigh: 13,
      medialCalf: 7,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBodyFatRepository.items.length).toEqual(1)
    expect(inMemoryBodyFatRepository.items[0].subscapular).toEqual(12)
  })
})
