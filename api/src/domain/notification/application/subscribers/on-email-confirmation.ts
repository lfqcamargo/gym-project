import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { EmailConfirmationCreatedEvent } from '@/domain/users/enterprise/events/email-confirmation-event'

export class OnEmailConfirmationCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewEmailConfirmationNotification.bind(this),
      EmailConfirmationCreatedEvent.name,
    )
  }

  private async sendNewEmailConfirmationNotification({
    user,
  }: EmailConfirmationCreatedEvent) {}
}
