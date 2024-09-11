import { DomainEvents } from '@/core/events/domain-events'
import { ProfileRepository } from '@/domain/users/application/repositories/profile-repository'
import { Profile } from '@/domain/users/enterprise/entities/profile'

export class InMemoryProfilesRepository implements ProfileRepository {
  public items: Profile[] = []

  async create(data: Profile) {
    this.items.push(data)

    DomainEvents.dispatchEventsForAggregate(data.id)
  }

  async findById(id: string) {
    const profile = this.items.find((item) => item.id.toString() === id)

    if (!profile) {
      return null
    }

    return profile
  }

  async save(data: Profile) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === data.id.toString(),
    )

    this.items[itemIndex] = data
  }
}
