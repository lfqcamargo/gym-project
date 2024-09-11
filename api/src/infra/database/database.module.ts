import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { ProfileRepository } from '@/domain/users/application/repositories/profile-repository'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaProfileRepository } from './prisma/repositories/prisma-profile-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { PrismaUserTempRepository } from './prisma/repositories/prisma-user-temp-repository'

@Module({
  providers: [
    PrismaService,
    PrismaClient,
    {
      provide: UserTempRepository,
      useClass: PrismaUserTempRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaClient,
    UserTempRepository,
    UserRepository,
    ProfileRepository,
  ],
})
export class DatabaseModule {}
