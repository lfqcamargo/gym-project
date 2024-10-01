import { MuscleGroup as PrismaMuscleGroup } from '@prisma/client'

import { MuscleGroup } from '@/domain/gym/enterprise/entities/muscle-group'

export class PrismaMuscleGroupMapper {
  static toDomain(raw: PrismaMuscleGroup): MuscleGroup {
    return MuscleGroup.create({
      id: raw.id,
      description: raw.description,
    })
  }

  static toPrisma(muscleGroup: MuscleGroup) {
    return {
      id: muscleGroup.id,
      description: muscleGroup.description,
    }
  }
}
