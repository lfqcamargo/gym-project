import { Injectable } from '@nestjs/common'

import { ExerciseRepository } from '@/domain/gym/application/repositories/exercise-repository'
import { Exercise } from '@/domain/gym/enterprise/entities/exercise'

import { PrismaExerciseMapper } from '../mappers/prisma-exercise-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<Exercise | null> {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    if (!exercise) {
      return null
    }

    return PrismaExerciseMapper.toDomain(exercise)
  }

  async fetchAll(page: number): Promise<Exercise[] | null> {
    const exercises = await this.prisma.exercise.findMany({
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        description: 'asc',
      },
    })

    if (!exercises) {
      return null
    }

    return exercises.map(PrismaExerciseMapper.toDomain)
  }
}
