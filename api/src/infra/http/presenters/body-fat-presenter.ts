import { BodyFat } from '@/domain/users/enterprise/entities/body-fat'

export class BodyFatPresenter {
  static toHTTP(bodyFat: BodyFat) {
    return {
      id: bodyFat.id.toString(),
      subscapular: bodyFat.subscapular,
      triceps: bodyFat.triceps,
      biceps: bodyFat.biceps,
      chest: bodyFat.chest,
      midAxillary: bodyFat.midAxillary,
      suprailiac: bodyFat.suprailiac,
      abdominal: bodyFat.abdominal,
      medialThigh: bodyFat.medialThigh,
      medialCalf: bodyFat.medialCalf,
      updatedDate: bodyFat.updatedDate,
    }
  }
}
