import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/users/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const { user, profile } = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: '123456',
      ...override,
    },
    id,
  )

  return { user, profile }
}
