import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import {
  MuscleGroup,
  MuscleGroupProps,
} from '@/domain/gym/enterprise/entities/muscle-group'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeMuscleGroup(override: Partial<MuscleGroupProps> = {}): {
  muscleGroup: MuscleGroup
} {
  const muscleGroup = MuscleGroup.create({
    id: override.id || faker.number.int({ min: 1, max: 1000 }),
    description: override.description || faker.lorem.words(2),
    ...override,
  })

  return { muscleGroup }
}

@Injectable()
export class MuscleGroupFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMuscleGroup(
    data: Partial<MuscleGroupProps> = {},
  ): Promise<MuscleGroup> {
    const { muscleGroup } = makeMuscleGroup(data)

    await this.prisma.muscleGroup.create({
      data: {
        id: muscleGroup.id,
        description: muscleGroup.description,
      },
    })

    return muscleGroup
  }
}
