import { Exercise } from '@/domain/gym/enterprise/entities/exercise'

export class ExercisePresenter {
  static toHTTP(exercise: Exercise) {
    return {
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
    }
  }
}
