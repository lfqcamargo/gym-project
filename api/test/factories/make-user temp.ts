import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  UserTemp,
  UserTempProps,
} from '@/domain/users/enterprise/entities/user-temp'

export function makeUserTemp(
  override: Partial<UserTempProps> = {},
  id?: UniqueEntityId,
) {
  const newUser = UserTemp.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: '123456',
      token: randomUUID(),
      tokenExpiration: dayjs().add(1, 'day').toDate(),
      ...override,
    },
    id,
  )

  return newUser
}
