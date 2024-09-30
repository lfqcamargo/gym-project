import { MuscleGroupRepository } from '@/domain/gym/application/repositories/muscle-group-repository'
import { MuscleGroup } from '@/domain/gym/enterprise/entities/muscle-group'

export class InMemoryMuscleGroupsRepository implements MuscleGroupRepository {
  public items: MuscleGroup[] = []

  async findById(id: number) {
    const musclegroup = this.items.find((item) => item.id === id)

    if (!musclegroup) {
      return null
    }

    return musclegroup
  }

  async fetchAll(page: number) {
    const exercises = this.items.slice((page - 1) * 10, page * 10)

    if (exercises.length === 0) {
      return null
    }

    return exercises
  }
}
