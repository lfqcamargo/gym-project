import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserTempProps {
  cpf: string
  email: string
  name: string
  password: string
  createdAt: Date
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

  set name(name: string) {
    this.props.name = name
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: Optional<UserTempProps, 'createdAt' | 'tokenExpiration'>,
    id?: UniqueEntityId) {
    const userTemp = new UserTemp(
      {
        ...props,
        createdAt: new Date(),
        tokenExpiration: new Date(),
      },
      id,
    )

    return userTemp
  }
}
