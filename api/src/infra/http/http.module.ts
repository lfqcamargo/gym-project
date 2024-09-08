import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { NestCreateUserTempUseCase } from '../injectables/nest-user-temp-use-case'
import { CreateUserTempController } from './controllers/create-user-temp.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserTempController],
  providers: [NestCreateUserTempUseCase],
})
export class HttpModule {}
