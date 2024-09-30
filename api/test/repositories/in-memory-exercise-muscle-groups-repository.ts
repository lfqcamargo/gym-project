import { ExerciseMuscleGroupsRepository } from '@/domain/gym/application/repositories/exercise-muscle-groups-repository'
import { ExerciseMuscleGroups } from '@/domain/gym/enterprise/entities/exercise-muscle-groups'

export class InMemoryExerciseMuscleGroupsRepository
  implements ExerciseMuscleGroupsRepository
{
  public items: ExerciseMuscleGroups[] = []

  async findById(id: number) {
    const exerciseMuscleGroups = this.items.filter((item) => item.id === id)

    if (exerciseMuscleGroups.length === 0) {
      return null
    }

    return exerciseMuscleGroups
  }
}
