import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
