import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { BodyFatRepository } from '@/domain/users/application/repositories/body-fat-repository'
import { BodyMeasurementRepository } from '@/domain/users/application/repositories/body-measurement-repository'
import { ProfileRepository } from '@/domain/users/application/repositories/profile-repository'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaBodyFatRepository } from './prisma/repositories/prisma-body-fat-repository'
import { PrismaBodyMeasurementRepository } from './prisma/repositories/prisma-body-measurement-repository'
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
    {
      provide: BodyMeasurementRepository,
      useClass: PrismaBodyMeasurementRepository,
    },
    {
      provide: BodyFatRepository,
      useClass: PrismaBodyFatRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaClient,
    UserTempRepository,
    UserRepository,
    ProfileRepository,
    BodyMeasurementRepository,
    BodyFatRepository,
  ],
})
export class DatabaseModule {}
