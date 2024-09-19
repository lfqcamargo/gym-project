import { BodyFat as PrismaBodyFat, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BodyFat } from '@/domain/users/enterprise/entities/body-fat'

export class PrismaBodyFatMapper {
  static toDomain(raw: PrismaBodyFat): BodyFat {
    return BodyFat.create(
      {
        subscapular: raw.subscapular,
        triceps: raw.triceps,
        biceps: raw.biceps,
        chest: raw.chest,
        midAxillary: raw.midAxillary,
        suprailiac: raw.suprailiac,
        abdominal: raw.abdominal,
        medialThigh: raw.medialThigh,
        medialCalf: raw.medialCalf,
        updatedDate: raw.updatedDate,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(bodyFat: BodyFat): Prisma.BodyFatUncheckedCreateInput {
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
