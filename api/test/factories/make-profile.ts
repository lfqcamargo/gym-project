import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Profile,
  ProfileProps,
} from '@/domain/users/enterprise/entities/profile'
import { PrismaProfileMapper } from '@/infra/database/prisma/mappers/prisma-profile-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeProfile(
  override: Partial<ProfileProps> = {},
  id?: UniqueEntityID,
) {
  const profile = Profile.create(
    {
      description: faker.lorem.sentence(),
      profilePhoto: Buffer.from(faker.image.url({ width: 640, height: 480 })),
      coverPhoto: Buffer.from(faker.image.url({ width: 1280, height: 720 })),
      ...override,
    },
    id ?? new UniqueEntityID(),
  )

  return { profile }
}

@Injectable()
export class ProfileFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProfile(data: Partial<ProfileProps> = {}): Promise<Profile> {
    const { profile } = makeProfile(data)

    await this.prisma.profile.create({
      data: PrismaProfileMapper.toPrisma(profile),
    })

    return profile
  }
}
