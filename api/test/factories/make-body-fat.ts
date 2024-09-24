import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  BodyFat,
  BodyFatProps,
} from '@/domain/users/enterprise/entities/body-fat'
import { PrismaBodyFatMapper } from '@/infra/database/prisma/mappers/prisma-body-fat-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeBodyFat(
  override: Partial<BodyFatProps> = {},
  id?: UniqueEntityID,
) {
  const bodyFat = BodyFat.create(
    {
      subscapular: faker.number.float({ min: 5, max: 20 }),
      triceps: faker.number.float({ min: 5, max: 20 }),
      biceps: faker.number.float({ min: 5, max: 20 }),
      chest: faker.number.float({ min: 5, max: 20 }),
      midAxillary: faker.number.float({ min: 5, max: 20 }),
      suprailiac: faker.number.float({ min: 5, max: 20 }),
      abdominal: faker.number.float({ min: 5, max: 20 }),
      medialThigh: faker.number.float({ min: 5, max: 20 }),
      medialCalf: faker.number.float({ min: 5, max: 20 }),
      updatedDate: new Date(),
      ...override,
    },
    id ?? new UniqueEntityID(),
  )

  return { bodyFat }
}

@Injectable()
export class BodyFatFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBodyFat(
    data: Partial<BodyFatProps> = {},
    id?: UniqueEntityID,
  ): Promise<BodyFat> {
    const { bodyFat } = makeBodyFat(data, id)

    await this.prisma.bodyFat.create({
      data: PrismaBodyFatMapper.toPrisma(bodyFat),
    })

    return bodyFat
  }
}
