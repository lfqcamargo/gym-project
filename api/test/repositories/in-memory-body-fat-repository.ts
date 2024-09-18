import { BodyFatRepository } from '@/domain/users/application/repositories/body-fat-repository'
import { BodyFat } from '@/domain/users/enterprise/entities/body-fat'

export class InMemoryBodyFatRepository implements BodyFatRepository {
  public items: BodyFat[] = []

  async create(data: BodyFat): Promise<void> {
    this.items.push(data)
  }

  async findById(id: string): Promise<BodyFat | null> {
    const bodyFat = this.items.find((item) => item.id.toString() === id)

    if (!bodyFat) {
      return null
    }

    return bodyFat
  }

  async save(bodyFat: BodyFat): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === bodyFat.id.toString(),
    )

    if (itemIndex !== -1) {
      this.items[itemIndex] = bodyFat
    } else {
      this.items.push(bodyFat)
    }
  }
}
