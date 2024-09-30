import { ExerciseRepository } from '@/domain/gym/application/repositories/exercise-repository'
import { Exercise } from '@/domain/gym/enterprise/entities/exercise'

export class InMemoryExercisesRepository implements ExerciseRepository {
  public items: Exercise[] = []

  async findById(id: number) {
    const exercise = this.items.find((item) => item.id === id)

    if (!exercise) {
      return null
    }

    return exercise
  }

  async fetchAll(page: number) {
    const exercises = this.items.slice((page - 1) * 10, page * 10)

    if (exercises.length === 0) {
      return null
    }

    return exercises
  }
}
