import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/users/enterprise/entities/user'

import { generateCPF } from './make-cpf'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const newUser = User.create(
    {
      cpf: generateCPF(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: '123456',
      ...override,
    },
    id,
  )

  return newUser
}
