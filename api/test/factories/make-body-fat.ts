import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  BodyFat,
  BodyFatProps,
} from '@/domain/users/enterprise/entities/body-fat'

export function makeBodyFat(
  override: Partial<BodyFatProps> = {},
  id?: UniqueEntityID,
) {
  const bodyFat = BodyFat.create(
    {
      subscapular: faker.number.float({ min: 5, max: 20 }),
      triceps: faker.number.float({ min: 5, max: 20 }),
      biceps: faker.number.float({ min: 5, max: 20 }),
      chest: faker.number.float({ min: 5, max: 20 }),
      midAxillary: faker.number.float({ min: 5, max: 20 }),
      suprailiac: faker.number.float({ min: 5, max: 20 }),
      abdominal: faker.number.float({ min: 5, max: 20 }),
      medialThigh: faker.number.float({ min: 5, max: 20 }),
      medialCalf: faker.number.float({ min: 5, max: 20 }),
      updatedDate: new Date(),
      ...override,
    },
    id ?? new UniqueEntityID(),
  )

  return { bodyFat }
}
