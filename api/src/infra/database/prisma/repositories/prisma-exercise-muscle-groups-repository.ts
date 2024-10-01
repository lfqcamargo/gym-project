import { Injectable } from '@nestjs/common'

import { ExerciseMuscleGroupsRepository } from '@/domain/gym/application/repositories/exercise-muscle-groups-repository'
import { ExerciseMuscleGroups } from '@/domain/gym/enterprise/entities/exercise-muscle-groups'

import { PrismaExerciseMuscleGroupsMapper } from '../mappers/prisma-exercise-muscle-groups-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaExerciseMuscleGroupsRepository
  implements ExerciseMuscleGroupsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<ExerciseMuscleGroups | null> {
    const exerciseMuscleGroup =
      await this.prisma.exerciseMuscleGroups.findUnique({
        where: {
          id,
        },
      })

    if (!exerciseMuscleGroup) {
      return null
    }

    return PrismaExerciseMuscleGroupsMapper.toDomain(exerciseMuscleGroup)
  }
}
