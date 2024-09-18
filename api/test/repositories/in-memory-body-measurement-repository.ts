import { BodyMeasurementRepository } from '@/domain/users/application/repositories/body-measurement-repository'
import { BodyMeasurement } from '@/domain/users/enterprise/entities/body-measurement'

export class InMemoryBodyMeasurementRepository
  implements BodyMeasurementRepository
{
  public items: BodyMeasurement[] = []

  async create(data: BodyMeasurement): Promise<void> {
    this.items.push(data)
  }

  async findById(id: string): Promise<BodyMeasurement | null> {
    const bodyMeasurement = this.items.find((item) => item.id.toString() === id)

    if (!bodyMeasurement) {
      return null
    }

    return bodyMeasurement
  }

  async save(bodyMeasurement: BodyMeasurement): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === bodyMeasurement.id.toString(),
    )

    if (itemIndex !== -1) {
      this.items[itemIndex] = bodyMeasurement
    } else {
      this.items.push(bodyMeasurement)
    }
  }
}
