import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

export class UserTempCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public userTemp: UserTemp

  constructor(userTemp: UserTemp) {
    this.userTemp = userTemp
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.userTemp.id
  }
}
