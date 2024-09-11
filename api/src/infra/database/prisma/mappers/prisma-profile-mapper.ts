import { Prisma, Profile as PrismaProfile } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Profile } from '@/domain/users/enterprise/entities/profile'

export class PrismaProfileMapper {
  static toDomain(raw: PrismaProfile): Profile {
    return Profile.create(
      {
        description: raw.description,
        profilePhoto: raw.profilePhoto,
        coverPhoto: raw.coverPhoto,
      },
      new UniqueEntityID(raw.userId),
    )
  }

  static toPrisma(Profile: Profile): Prisma.ProfileUncheckedCreateInput {
    return {
      userId: Profile.id.toString(),
      description: Profile.description,
      profilePhoto: Profile.profilePhoto,
      coverPhoto: Profile.coverPhoto,
    }
  }
}
