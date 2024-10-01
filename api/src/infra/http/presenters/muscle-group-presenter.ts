import { MuscleGroup } from '@/domain/gym/enterprise/entities/muscle-group'

export class MuscleGroupPresenter {
  static toHTTP(muscleGroup: MuscleGroup) {
    return {
      id: muscleGroup.id,
      description: muscleGroup.description,
    }
  }
}
