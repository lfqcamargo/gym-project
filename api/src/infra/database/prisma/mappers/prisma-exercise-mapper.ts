import { Exercise as PrismaExercise } from '@prisma/client'

import { Exercise } from '@/domain/gym/enterprise/entities/exercise'

export class PrismaExerciseMapper {
  static toDomain(raw: PrismaExercise): Exercise {
    return Exercise.create({
      id: raw.id,
      name: raw.name,
      description: raw.description,
    })
  }
}
