import { MuscleGroup } from '@/domain/gym/enterprise/entities/muscle-group'

export abstract class MuscleGroupRepository {
  abstract findById(id: number): Promise<MuscleGroup | null>
  abstract fetchAll(page: number): Promise<MuscleGroup[] | null>
}
