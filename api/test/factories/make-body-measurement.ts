import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  BodyMeasurement,
  BodyMeasurementProps,
} from '@/domain/users/enterprise/entities/body-measurement'
import { PrismaBodyMeasurementMapper } from '@/infra/database/prisma/mappers/prisma-body-measurement-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeBodyMeasurement(
  override: Partial<BodyMeasurementProps> = {},
  id?: UniqueEntityID,
) {
  const bodyMeasurement = BodyMeasurement.create(
    {
      leftRelaxedArm: faker.number.float({ min: 20, max: 40 }),
      rightRelaxedArm: faker.number.float({ min: 20, max: 40 }),
      leftContractedArm: faker.number.float({ min: 25, max: 45 }),
      rightContractedArm: faker.number.float({ min: 25, max: 45 }),
      leftForearm: faker.number.float({ min: 15, max: 30 }),
      rightForearm: faker.number.float({ min: 15, max: 30 }),
      leftThigh: faker.number.float({ min: 40, max: 70 }),
      rightThigh: faker.number.float({ min: 40, max: 70 }),
      leftCalf: faker.number.float({ min: 25, max: 45 }),
      rightCalf: faker.number.float({ min: 25, max: 45 }),
      relaxedChest: faker.number.float({ min: 80, max: 120 }),
      inspiredChest: faker.number.float({ min: 85, max: 125 }),
      waist: faker.number.float({ min: 60, max: 110 }),
      abdomen: faker.number.float({ min: 70, max: 120 }),
      hip: faker.number.float({ min: 80, max: 130 }),
      neck: faker.number.float({ min: 30, max: 50 }),
      shoulder: faker.number.float({ min: 40, max: 60 }),
      upperSkinfolds: faker.number.float({ min: 5, max: 20 }),
      lowerSkinfolds: faker.number.float({ min: 5, max: 20 }),
      updatedDate: new Date(),
      ...override,
    },
    id ?? new UniqueEntityID(),
  )

  return { bodyMeasurement }
}

@Injectable()
export class BodyMeasurementFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBodyMeasurement(
    data: Partial<BodyMeasurementProps> = {},
  ): Promise<BodyMeasurement> {
    const { bodyMeasurement } = makeBodyMeasurement(data)

    await this.prisma.bodyMeasurement.create({
      data: PrismaBodyMeasurementMapper.toPrisma(bodyMeasurement),
    })

    return bodyMeasurement
  }
}
