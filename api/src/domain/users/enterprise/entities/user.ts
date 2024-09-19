import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from '../../application/use-cases/value-objects/slug'
import { EmailConfirmationCreatedEvent } from '../events/email-confirmation-event'
import { Profile } from './profile'

export interface UserProps {
  email: string
  name: string
  password: string
  slug?: Slug
  createdAt: Date
  lastLogin?: Date | null
}

export class User extends AggregateRoot<UserProps> {
  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get slug(): Slug | null {
    if (this.props.slug) {
      return this.props.slug
    }

    return null
  }

  get createdAt() {
    return this.props.createdAt
  }

  get lastLogin() {
    return this.props.lastLogin
  }

  set name(name: string) {
    this.props.name = name
  }

  set password(password: string) {
    this.props.password = password
  }

  set slug(slug: Slug) {
    this.props.slug = slug
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    const profile = Profile.create(
      {
        description: null,
        profilePhoto: null,
        coverPhoto: null,
      },
      user.id,
    )

    user.addDomainEvent(new EmailConfirmationCreatedEvent(user))

    return { user, profile }
  }
}
