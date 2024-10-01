import { ExerciseMuscleGroups as PrismaExerciseMuscleGroups } from '@prisma/client'

import { ExerciseMuscleGroups } from '@/domain/gym/enterprise/entities/exercise-muscle-groups'

export class PrismaExerciseMuscleGroupsMapper {
  static toDomain(raw: PrismaExerciseMuscleGroups): ExerciseMuscleGroups {
    return ExerciseMuscleGroups.create({
      id: raw.id,
      exerciseId: raw.exerciseId,
      muscleGroupId: raw.muscleGroupId,
      muscleActivation: raw.muscleActivation,
    })
  }

  static toPrisma(exerciseMuscleGroups: ExerciseMuscleGroups) {
    return {
      id: exerciseMuscleGroups.id,
      exerciseId: exerciseMuscleGroups.exerciseId,
      muscleGroupId: exerciseMuscleGroups.muscleGroupId,
      muscleActivation: exerciseMuscleGroups.muscleActivation,
    }
  }
}
