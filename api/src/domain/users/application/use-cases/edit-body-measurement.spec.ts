import { makeBodyMeasurement } from 'test/factories/make-body-measurement'
import { InMemoryBodyMeasurementRepository } from 'test/repositories/in-memory-body-measurement-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditBodyMeasurementUseCase } from './edit-body-measurement'

let inMemoryBodyMeasurementRepository: InMemoryBodyMeasurementRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditBodyMeasurementUseCase

describe('EditBodyMeasurementUseCase', () => {
  beforeEach(() => {
    inMemoryBodyMeasurementRepository = new InMemoryBodyMeasurementRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditBodyMeasurementUseCase(
      inMemoryBodyMeasurementRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to update the left relaxed arm measurement', async () => {
    const { bodyMeasurement } = makeBodyMeasurement({ leftRelaxedArm: 30 })
    await inMemoryBodyMeasurementRepository.create(bodyMeasurement)

    const result = await sut.execute({
      id: bodyMeasurement.id.toString(),
      leftRelaxedArm: 35,
      rightRelaxedArm: bodyMeasurement.rightRelaxedArm,
      leftContractedArm: bodyMeasurement.leftContractedArm,
      rightContractedArm: bodyMeasurement.rightContractedArm,
      leftForearm: bodyMeasurement.leftForearm,
      rightForearm: bodyMeasurement.rightForearm,
      leftThigh: bodyMeasurement.leftThigh,
      rightThigh: bodyMeasurement.rightThigh,
      leftCalf: bodyMeasurement.leftCalf,
      rightCalf: bodyMeasurement.rightCalf,
      relaxedChest: bodyMeasurement.relaxedChest,
      inspiredChest: bodyMeasurement.inspiredChest,
      waist: bodyMeasurement.waist,
      abdomen: bodyMeasurement.abdomen,
      hip: bodyMeasurement.hip,
      neck: bodyMeasurement.neck,
      shoulder: bodyMeasurement.shoulder,
      upperSkinfolds: bodyMeasurement.upperSkinfolds,
      lowerSkinfolds: bodyMeasurement.lowerSkinfolds,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBodyMeasurementRepository.items[0].leftRelaxedArm).toEqual(
      35,
    )
  })

  it('should return an error if body measurement does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      leftRelaxedArm: 35,
      rightRelaxedArm: 40,
      leftContractedArm: 40,
      rightContractedArm: 40,
      leftForearm: 30,
      rightForearm: 30,
      leftThigh: 60,
      rightThigh: 60,
      leftCalf: 40,
      rightCalf: 40,
      relaxedChest: 100,
      inspiredChest: 110,
      waist: 90,
      abdomen: 80,
      hip: 100,
      neck: 40,
      shoulder: 50,
      upperSkinfolds: 15,
      lowerSkinfolds: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should create a new body measurement if the user exists but measurement does not', async () => {
    const { bodyMeasurement } = makeBodyMeasurement()
    await inMemoryBodyMeasurementRepository.create(bodyMeasurement)

    const result = await sut.execute({
      id: bodyMeasurement.id.toString(),
      leftRelaxedArm: 35,
      rightRelaxedArm: 10,
      leftContractedArm: 40,
      rightContractedArm: 40,
      leftForearm: 30,
      rightForearm: 30,
      leftThigh: 60,
      rightThigh: 60,
      leftCalf: 40,
      rightCalf: 40,
      relaxedChest: 100,
      inspiredChest: 110,
      waist: 90,
      abdomen: 80,
      hip: 100,
      neck: 40,
      shoulder: 50,
      upperSkinfolds: 15,
      lowerSkinfolds: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBodyMeasurementRepository.items[0].leftRelaxedArm).toEqual(
      35,
    )
  })
})
