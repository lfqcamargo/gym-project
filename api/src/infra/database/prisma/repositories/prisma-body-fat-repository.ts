import { Injectable } from '@nestjs/common'

import { BodyFatRepository } from '@/domain/users/application/repositories/body-fat-repository'
import { BodyFat } from '@/domain/users/enterprise/entities/body-fat'

import { PrismaBodyFatMapper } from '../mappers/prisma-body-fat-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaBodyFatRepository implements BodyFatRepository {
  constructor(private prisma: PrismaService) {}

  async create(bodyFat: BodyFat): Promise<void> {
    const data = PrismaBodyFatMapper.toPrisma(bodyFat)

    await this.prisma.bodyFat.create({
      data,
    })
  }

  async findById(id: string): Promise<BodyFat | null> {
    const bodyFat = await this.prisma.bodyFat.findUnique({
      where: {
        id,
      },
    })

    if (!bodyFat) {
      return null
    }

    return PrismaBodyFatMapper.toDomain(bodyFat)
  }

  async save(bodyFat: BodyFat): Promise<void> {
    const data = PrismaBodyFatMapper.toPrisma(bodyFat)

    await this.prisma.bodyFat.update({
      where: {
        id: bodyFat.id.toString(),
      },
      data,
    })
  }
}
