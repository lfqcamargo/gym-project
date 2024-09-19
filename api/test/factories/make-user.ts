import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/users/application/use-cases/value-objects/slug'
import { User, UserProps } from '@/domain/users/enterprise/entities/user'
import { PrismaProfileMapper } from '@/infra/database/prisma/mappers/prisma-profile-mapper'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
  existingSlugs: string[] = [],
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

  let slugValue = Slug.createFromText(user.name).value
  const baseSlug = slugValue
  let suffix = 1

  while (existingSlugs.includes(slugValue)) {
    slugValue = `${baseSlug}-${suffix}`
    suffix++
  }

  user.slug = Slug.create(slugValue)

  existingSlugs.push(slugValue)

  return { user, profile }
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const { user, profile } = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    await this.prisma.profile.create({
      data: PrismaProfileMapper.toPrisma(profile),
    })

    return user
  }
}
