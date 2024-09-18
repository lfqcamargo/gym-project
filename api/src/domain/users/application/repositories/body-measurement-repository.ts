import { BodyMeasurement } from '@/domain/users/enterprise/entities/body-measurement'

export abstract class BodyMeasurementRepository {
  abstract create(data: BodyMeasurement): Promise<void>
  abstract findById(id: string): Promise<BodyMeasurement | null>
  abstract save(bodyMeasurement: BodyMeasurement): Promise<void>
}
