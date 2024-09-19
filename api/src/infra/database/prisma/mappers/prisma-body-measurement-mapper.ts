import {
  BodyMeasurement as PrismaBodyMeasurement,
  Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BodyMeasurement } from '@/domain/users/enterprise/entities/body-measurement'

export class PrismaBodyMeasurementMapper {
  static toDomain(raw: PrismaBodyMeasurement): BodyMeasurement {
    return BodyMeasurement.create(
      {
        leftRelaxedArm: raw.leftRelaxedArm,
        rightRelaxedArm: raw.rightRelaxedArm,
        leftContractedArm: raw.leftContractedArm,
        rightContractedArm: raw.rightContractedArm,
        leftForearm: raw.leftForearm,
        rightForearm: raw.rightForearm,
        leftThigh: raw.leftThigh,
        rightThigh: raw.rightThigh,
        leftCalf: raw.leftCalf,
        rightCalf: raw.rightCalf,
        relaxedChest: raw.relaxedChest,
        inspiredChest: raw.inspiredChest,
        waist: raw.waist,
        abdomen: raw.abdomen,
        hip: raw.hip,
        neck: raw.neck,
        shoulder: raw.shoulder,
        upperSkinfolds: raw.upperSkinfolds,
        lowerSkinfolds: raw.lowerSkinfolds,
        updatedDate: raw.updatedDate,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    bodyMeasurement: BodyMeasurement,
  ): Prisma.BodyMeasurementUncheckedCreateInput {
    return {
      id: bodyMeasurement.id.toString(),
      leftRelaxedArm: bodyMeasurement.leftRelaxedArm,
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
      updatedDate: bodyMeasurement.updatedDate,
    }
  }
}
