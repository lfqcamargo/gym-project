import { DomainEvents } from '@/core/events/domain-events'
import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

export class InMemoryUsersTempRepository implements UserTempRepository {
  public items: UserTemp[] = []

  async create(data: UserTemp) {
    this.items.push(data)

    DomainEvents.dispatchEventsForAggregate(data.id)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByToken(token: string) {
    const user = this.items.find((item) => item.token === token)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save(data: UserTemp) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === data.id.toString(),
    )

    this.items[itemIndex] = data

    DomainEvents.dispatchEventsForAggregate(data.id)
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }
}
