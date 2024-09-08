import { Injectable } from '@nestjs/common'

import { Encrypter } from '@/domain/users/application/cryptography/encrypter'
import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserTempRepository } from '@/domain/users/application/repositories/user-temp-repository'
import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user'
import { CreateUserTempUseCase } from '@/domain/users/application/use-cases/create-user-temp'

@Injectable()
export class NestCreateUserTempUseCase extends CreateUserTempUseCase {
  constructor(
    userTempRepository: UserTempRepository,
    userRepository: UserRepository,
    hashRepository: HashGenerator,
  ) {
    super(userTempRepository, userRepository, hashRepository)
  }
}

@Injectable()
export class NestAuthenticateUserUseCase extends AuthenticateUserUseCase {
  constructor(
    userRepository: UserRepository,
    hashRepository: HashComparer,
    encrypter: Encrypter,
  ) {
    super(userRepository, hashRepository, encrypter)
  }
}
