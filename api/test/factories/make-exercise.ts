import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import {
  Exercise,
  ExerciseProps,
} from '@/domain/gym/enterprise/entities/exercise'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeExercise(override: Partial<ExerciseProps> = {}): {
  exercise: Exercise
} {
  const exercise = Exercise.create({
    id: override.id || faker.number.int({ min: 1, max: 1000 }),
    name: override.name || faker.lorem.words(2),
    description: override.description || faker.lorem.sentence(),
    ...override,
  })

  return { exercise }
}

@Injectable()
export class ExerciseFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaExercise(
    data: Partial<ExerciseProps> = {},
  ): Promise<Exercise> {
    const { exercise } = makeExercise(data)

    await this.prisma.exercise.create({
      data: {
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
      },
    })

    return exercise
  }
}
