import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user'
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user'
import { CreateUserTempUseCase } from '@/domain/users/application/use-cases/create-user-temp'
import { EditProfileUseCase } from '@/domain/users/application/use-cases/edit-profile'
import { EditUserUseCase } from '@/domain/users/application/use-cases/edit-user'
import { EmailConfirmationUseCase } from '@/domain/users/application/use-cases/email-confirmation'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateUserTempController } from './controllers/create-user-temp.controller'
import { EditProfileController } from './controllers/edit-profile'
import { EditUserController } from './controllers/edit-user.controller'
import { EmailConfirmationController } from './controllers/email-confirmation.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserTempController,
    EmailConfirmationController,
    EditUserController,
    EditProfileController,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateUserTempUseCase,
    EmailConfirmationUseCase,
    CreateUserUseCase,
    EditUserUseCase,
    EditProfileUseCase,
  ],
})
export class HttpModule {}
