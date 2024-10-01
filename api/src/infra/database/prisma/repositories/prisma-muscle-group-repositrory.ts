import { Injectable } from '@nestjs/common'

import { MuscleGroupRepository } from '@/domain/gym/application/repositories/muscle-group-repository'
import { MuscleGroup } from '@/domain/gym/enterprise/entities/muscle-group'

import { PrismaMuscleGroupMapper } from '../mappers/prisma-muscle-group-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaMuscleGroupRepository implements MuscleGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<MuscleGroup | null> {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({
      where: {
        id,
      },
    })

    if (!muscleGroup) {
      return null
    }

    return PrismaMuscleGroupMapper.toDomain(muscleGroup)
  }

  async fetchAll(page: number): Promise<MuscleGroup[] | null> {
    const muscleGroups = await this.prisma.muscleGroup.findMany({
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        description: 'asc',
      },
    })

    if (!muscleGroups) {
      return null
    }

    return muscleGroups.map(PrismaMuscleGroupMapper.toDomain)
  }
}
