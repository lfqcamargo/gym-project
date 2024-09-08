import { Injectable } from '@nestjs/common'

import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

import { PrismaUserTempMapper } from '../mappers/prisma-user-temp-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUserTempRepository implements UserTempRepository {
  constructor(private prisma: PrismaService) {}

  async create(userTemp: UserTemp): Promise<void> {
    const data = PrismaUserTempMapper.toPrisma(userTemp)

    await this.prisma.userTemp.create({
      data,
    })
  }

  async findById(id: string): Promise<UserTemp | null> {
    const userTemp = await this.prisma.userTemp.findUnique({
      where: {
        id,
      },
    })

    if (!userTemp) {
      return null
    }

    return PrismaUserTempMapper.toDomain(userTemp)
  }

  async findByEmail(email: string): Promise<UserTemp | null> {
    const userTemp = await this.prisma.userTemp.findUnique({
      where: {
        email,
      },
    })

    if (!userTemp) {
      return null
    }

    return PrismaUserTempMapper.toDomain(userTemp)
  }

  async findByToken(token: string): Promise<UserTemp | null> {
    const userTemp = await this.prisma.userTemp.findFirst({
      where: {
        token,
      },
    })

    if (!userTemp) {
      return null
    }

    return PrismaUserTempMapper.toDomain(userTemp)
  }

  async save(user: UserTemp): Promise<void> {
    const data = PrismaUserTempMapper.toPrisma(user)

    await this.prisma.userTemp.update({
      where: {
        id: user.id.toString(),
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userTemp.delete({
      where: {
        id,
      },
    })
  }
}
