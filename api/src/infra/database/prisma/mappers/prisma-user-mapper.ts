import { Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/users/application/use-cases/value-objects/slug'
import { User } from '@/domain/users/enterprise/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    const { user } = User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        lastLogin: raw.lastLogin,
      },
      new UniqueEntityID(raw.id),
    )

    return user
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      slug: user.slug?.value || '',
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    }
  }
}
