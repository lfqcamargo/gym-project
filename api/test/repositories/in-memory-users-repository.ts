import { DomainEvents } from '@/core/events/domain-events'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { User } from '@/domain/users/enterprise/entities/user'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async create(data: User) {
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

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save(data: User) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === data.id.toString(),
    )

    this.items[itemIndex] = data
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }
}
