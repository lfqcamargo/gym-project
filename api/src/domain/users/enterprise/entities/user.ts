import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  cpf: string
  email: string
  name: string
  password: string
  createdAt: Date
  lastLogin?: Date | null
}

export class User extends Entity<UserProps> {
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

  get lastLogin() {
    return this.props.lastLogin
  }

  set name(name: string) {
    this.props.name = name
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
