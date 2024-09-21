import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user'
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user'
import { CreateUserTempUseCase } from '@/domain/users/application/use-cases/create-user-temp'
import { EditBodyFatUseCase } from '@/domain/users/application/use-cases/edit-body-fat'
import { EditBodyMeasurementUseCase } from '@/domain/users/application/use-cases/edit-body-measurement'
import { EditProfileUseCase } from '@/domain/users/application/use-cases/edit-profile'
import { EditUserUseCase } from '@/domain/users/application/use-cases/edit-user'
import { EmailConfirmationUseCase } from '@/domain/users/application/use-cases/email-confirmation'
import { GetProfileUseCase } from '@/domain/users/application/use-cases/get-profile'
import { GetProfileBySlugUseCase } from '@/domain/users/application/use-cases/get-profile-by-slug'
import { DatabaseModule } from '@/infra/database/database.module'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateUserTempController } from './controllers/create-user-temp.controller'
import { EditBodyFatController } from './controllers/edit-body-fat.controller'
import { EditBodyMeasurementController } from './controllers/edit-body-measurement.controller'
import { EditProfileController } from './controllers/edit-profile'
import { EditUserController } from './controllers/edit-user.controller'
import { EmailConfirmationController } from './controllers/email-confirmation.controller'
import { GetProfileController } from './controllers/get-profile.controller'
import { GetProfileBySlugController } from './controllers/get-profile-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserTempController,
    EmailConfirmationController,
    EditUserController,
    EditProfileController,
    GetProfileController,
    EditBodyMeasurementController,
    EditBodyFatController,
    GetProfileBySlugController,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateUserTempUseCase,
    EmailConfirmationUseCase,
    CreateUserUseCase,
    EditUserUseCase,
    EditProfileUseCase,
    GetProfileUseCase,
    EditBodyMeasurementUseCase,
    EditBodyFatUseCase,
    GetProfileBySlugUseCase,
  ],
})
export class HttpModule {}
