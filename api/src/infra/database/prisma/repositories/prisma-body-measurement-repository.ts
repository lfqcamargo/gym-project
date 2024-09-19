import { Injectable } from '@nestjs/common'

import { BodyMeasurementRepository } from '@/domain/users/application/repositories/body-measurement-repository'
import { BodyMeasurement } from '@/domain/users/enterprise/entities/body-measurement'

import { PrismaBodyMeasurementMapper } from '../mappers/prisma-body-measurement-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaBodyMeasurementRepository
  implements BodyMeasurementRepository
{
  constructor(private prisma: PrismaService) {}

  async create(bodyMeasurement: BodyMeasurement): Promise<void> {
    const data = PrismaBodyMeasurementMapper.toPrisma(bodyMeasurement)

    await this.prisma.bodyMeasurement.create({
      data,
    })
  }

  async findById(id: string): Promise<BodyMeasurement | null> {
    const bodyMeasurement = await this.prisma.bodyMeasurement.findUnique({
      where: {
        id,
      },
    })

    if (!bodyMeasurement) {
      return null
    }

    return PrismaBodyMeasurementMapper.toDomain(bodyMeasurement)
  }

  async save(bodyMeasurement: BodyMeasurement): Promise<void> {
    const data = PrismaBodyMeasurementMapper.toPrisma(bodyMeasurement)

    await this.prisma.bodyMeasurement.update({
      where: {
        id: bodyMeasurement.id.toString(),
      },
      data,
    })
  }
}
