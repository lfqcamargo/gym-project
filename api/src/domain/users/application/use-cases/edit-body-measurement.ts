import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyMeasurement } from '../../enterprise/entities/body-measurement'
import { BodyMeasurementRepository } from '../repositories/body-measurement-repository'
import { UserRepository } from '../repositories/user-repository'

interface EditBodyMeasurementUseCaseRequest {
  id: string
  leftRelaxedArm: number
  rightRelaxedArm: number
  leftContractedArm: number
  rightContractedArm: number
  leftForearm: number
  rightForearm: number
  leftThigh: number
  rightThigh: number
  leftCalf: number
  rightCalf: number
  relaxedChest: number
  inspiredChest: number
  waist: number
  abdomen: number
  hip: number
  neck: number
  shoulder: number
  upperSkinfolds: number
  lowerSkinfolds: number
}

type EditBodyMeasurementUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class EditBodyMeasurementUseCase {
  constructor(
    private bodyMeasurementRepository: BodyMeasurementRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    id,
    leftRelaxedArm,
    rightRelaxedArm,
    leftContractedArm,
    rightContractedArm,
    leftForearm,
    rightForearm,
    leftThigh,
    rightThigh,
    leftCalf,
    rightCalf,
    relaxedChest,
    inspiredChest,
    waist,
    abdomen,
    hip,
    neck,
    shoulder,
    upperSkinfolds,
    lowerSkinfolds,
  }: EditBodyMeasurementUseCaseRequest): Promise<EditBodyMeasurementUseCaseResponse> {
    const bodyMeasurement = await this.bodyMeasurementRepository.findById(id)

    if (!bodyMeasurement) {
      const user = await this.userRepository.findById(id)

      if (!user) {
        return left(new ResourceNotFoundError())
      }

      BodyMeasurement.create(
        {
          leftRelaxedArm,
          rightRelaxedArm,
          leftContractedArm,
          rightContractedArm,
          leftForearm,
          rightForearm,
          leftThigh,
          rightThigh,
          leftCalf,
          rightCalf,
          relaxedChest,
          inspiredChest,
          waist,
          abdomen,
          hip,
          neck,
          shoulder,
          upperSkinfolds,
          lowerSkinfolds,
        },
        user.id,
      )
    } else {
      bodyMeasurement.leftRelaxedArm = leftRelaxedArm
      bodyMeasurement.rightRelaxedArm = rightRelaxedArm
      bodyMeasurement.leftContractedArm = leftContractedArm
      bodyMeasurement.rightContractedArm = rightContractedArm
      bodyMeasurement.leftForearm = leftForearm
      bodyMeasurement.rightForearm = rightForearm
      bodyMeasurement.leftThigh = leftThigh
      bodyMeasurement.rightThigh = rightThigh
      bodyMeasurement.leftCalf = leftCalf
      bodyMeasurement.rightCalf = rightCalf
      bodyMeasurement.relaxedChest = relaxedChest
      bodyMeasurement.inspiredChest = inspiredChest
      bodyMeasurement.waist = waist
      bodyMeasurement.abdomen = abdomen
      bodyMeasurement.hip = hip
      bodyMeasurement.neck = neck
      bodyMeasurement.shoulder = shoulder
      bodyMeasurement.upperSkinfolds = upperSkinfolds
      bodyMeasurement.lowerSkinfolds = lowerSkinfolds

      await this.bodyMeasurementRepository.save(bodyMeasurement)
    }

    return right(null)
  }
}
