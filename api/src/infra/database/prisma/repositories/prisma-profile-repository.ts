import { Injectable } from '@nestjs/common'

import { ProfileRepository } from '@/domain/users/application/repositories/profile-repository'
import { Profile } from '@/domain/users/enterprise/entities/profile'

import { PrismaProfileMapper } from '../mappers/prisma-profile-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private prisma: PrismaService) {}

  async create(profile: Profile): Promise<void> {
    const data = PrismaProfileMapper.toPrisma(profile)

    await this.prisma.profile.create({
      data,
    })
  }

  async findById(userId: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    })

    if (!profile) {
      return null
    }

    return PrismaProfileMapper.toDomain(profile)
  }

  async save(profile: Profile): Promise<void> {
    const data = PrismaProfileMapper.toPrisma(profile)

    await this.prisma.profile.update({
      where: {
        userId: profile.id.toString(),
      },
      data,
    })
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        userId,
      },
    })
  }
}
