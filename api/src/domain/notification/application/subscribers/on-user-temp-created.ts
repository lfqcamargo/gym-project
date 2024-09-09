import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { UserTempCreatedEvent } from '@/domain/users/enterprise/events/user-temp-created-event'

export class OnUserTempCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewUserTempNotification.bind(this),
      UserTempCreatedEvent.name,
    )
  }

  private async sendNewUserTempNotification({
    userTemp,
  }: UserTempCreatedEvent) {
    console.log(userTemp.token)
  }
}
