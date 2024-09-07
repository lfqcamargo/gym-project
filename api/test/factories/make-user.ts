import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/users/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const newUser = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: '123456',
      ...override,
    },
    id,
  )

  return newUser
}
