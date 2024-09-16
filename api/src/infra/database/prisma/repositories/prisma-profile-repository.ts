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

  async findById(id: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
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
        id: profile.id.toString(),
      },
      data,
    })
  }
}
