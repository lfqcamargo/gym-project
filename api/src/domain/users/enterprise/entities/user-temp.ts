import { randomUUID } from 'node:crypto'

import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserTempProps {
  cpf: string
  email: string
  name: string
  password: string
  createdAt: Date
  token: string
  tokenExpiration: Date
}

export class UserTemp extends Entity<UserTempProps> {
  get cpf() {
    return this.props.cpf
  }

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
    id?: UniqueEntityId,
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

    return userTemp
  }

  public updateDetails(cpf: string, name: string, password: string) {
    this.props.cpf = cpf
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
