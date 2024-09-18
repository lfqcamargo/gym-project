import { BodyFat } from '@/domain/users/enterprise/entities/body-fat'

export abstract class BodyFatRepository {
  abstract create(data: BodyFat): Promise<void>
  abstract findById(id: string): Promise<BodyFat | null>
  abstract save(bodyFat: BodyFat): Promise<void>
}
