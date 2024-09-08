import { Prisma, UserTemp as PrismaUserTemp } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

export class PrismaUserTempMapper {
  static toDomain(raw: PrismaUserTemp): UserTemp {
    return UserTemp.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        token: raw.token,
        tokenExpiration: raw.tokenExpiration,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(userTemp: UserTemp): Prisma.UserTempUncheckedCreateInput {
    return {
      id: userTemp.id.toString(),
      email: userTemp.email,
      name: userTemp.name,
      password: userTemp.password,
      token: userTemp.token,
      tokenExpiration: userTemp.tokenExpiration,
    }
  }
}
