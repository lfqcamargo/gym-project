import { Logger } from '@nestjs/common'

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
    const logger = new Logger('AppController')
    logger.log(`http://localhost:3333/confirmation/${userTemp.token}`)
  }
}
