import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import {
  ExerciseMuscleGroups,
  ExerciseMuscleGroupsProps,
} from '@/domain/gym/enterprise/entities/exercise-muscle-groups'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeExerciseMuscleGroups(
  override: Partial<ExerciseMuscleGroupsProps> = {},
): {
  exerciseMuscleGroups: ExerciseMuscleGroups
} {
  const exerciseMuscleGroups = ExerciseMuscleGroups.create({
    id: override.id || faker.number.int({ min: 1, max: 1000 }),
    exerciseId: override.exerciseId || faker.number.int({ min: 1, max: 1000 }),
    muscleGroupId:
      override.muscleGroupId || faker.number.int({ min: 1, max: 1000 }),
    muscleActivation:
      override.muscleActivation ||
      faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    ...override,
  })

  return { exerciseMuscleGroups }
}

@Injectable()
export class ExerciseMuscleGroupsFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaExerciseMuscleGroups(
    data: Partial<ExerciseMuscleGroupsProps> = {},
  ): Promise<ExerciseMuscleGroups> {
    const { exerciseMuscleGroups } = makeExerciseMuscleGroups(data)

    await this.prisma.exerciseMuscleGroups.create({
      data: {
        id: exerciseMuscleGroups.id,
        exerciseId: exerciseMuscleGroups.exerciseId,
        muscleGroupId: exerciseMuscleGroups.muscleGroupId,
        muscleActivation: exerciseMuscleGroups.muscleActivation,
      },
    })

    return exerciseMuscleGroups
  }
}
