import { ExerciseMuscleGroups } from '@/domain/gym/enterprise/entities/exercise-muscle-groups'

export abstract class ExerciseMuscleGroupsRepository {
  abstract findById(id: number): Promise<ExerciseMuscleGroups | null>
}
