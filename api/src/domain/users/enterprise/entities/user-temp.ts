import { randomUUID } from 'node:crypto'

import dayjs from 'dayjs'

import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { UserTempCreatedEvent } from '@/domain/users/enterprise/events/user-temp-created-event'

export interface UserTempProps {
  email: string
  name: string
  password: string
  createdAt: Date
  token: string
  tokenExpiration: Date
}

export class UserTemp extends AggregateRoot<UserTempProps> {
  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get token() {
    return this.props.token
  }

  get tokenExpiration() {
    return this.props.tokenExpiration
  }

  static create(
    props: Optional<UserTempProps, 'createdAt' | 'token' | 'tokenExpiration'>,
    id?: UniqueEntityID,
  ) {
    const userTemp = new UserTemp(
      {
        ...props,
        createdAt: new Date(),
        token: randomUUID(),
        tokenExpiration: dayjs().add(1, 'day').toDate(),
      },
      id,
    )

    userTemp.addDomainEvent(new UserTempCreatedEvent(userTemp))

    return userTemp
  }

  public updateDetails(name: string, password: string) {
    this.props.name = name
    this.props.password = password
    this.touch()
  }

  private touch() {
    this.props.token = randomUUID()
    this.props.tokenExpiration = dayjs().add(1, 'day').toDate()
    this.props.createdAt = new Date()
  }
}
