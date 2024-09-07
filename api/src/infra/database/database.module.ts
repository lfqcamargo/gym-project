import { Module } from '@nestjs/common'

import { UserRepository } from '@/domain/users/application/repositories/user-repository'

import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
