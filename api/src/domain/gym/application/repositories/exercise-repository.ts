import { Exercise } from '@/domain/gym/enterprise/entities/exercise'

export abstract class ExerciseRepository {
  abstract findById(id: number): Promise<Exercise | null>
  abstract fetchAll(page: number): Promise<Exercise[] | null>
}
