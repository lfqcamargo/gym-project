import { ExerciseMuscleGroups } from '@/domain/gym/enterprise/entities/exercise-muscle-groups'

export class ExerciseMuscleGroupsPresenter {
  static toHTTP(exerciseMuscleGroups: ExerciseMuscleGroups) {
    return {
      id: exerciseMuscleGroups.id,
      exerciseId: exerciseMuscleGroups.exerciseId,
      muscleGroupId: exerciseMuscleGroups.muscleGroupId,
      muscleActivation: exerciseMuscleGroups.muscleActivation,
    }
  }
}
