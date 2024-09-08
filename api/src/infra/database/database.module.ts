import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'

import { PrismaService } from './prisma/prisma.service'
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
      useClass: PrismaUserTempRepository,
    },
  ],
  exports: [PrismaService, PrismaClient, UserTempRepository, UserRepository],
})
export class DatabaseModule {}
