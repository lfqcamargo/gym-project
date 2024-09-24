import { BodyMeasurement } from '@/domain/users/enterprise/entities/body-measurement'

export class BodyMeasurementPresenter {
  static toHTTP(bodyMeasurement: BodyMeasurement) {
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
