import { Injectable } from '@nestjs/common'

import { Encrypter } from '@/domain/users/application/cryptography/encrypter'
import { HashComparer } from '@/domain/users/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/users/application/cryptography/hash-generator'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user'
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user'

@Injectable()
export class NestCreateUserUseCase extends CreateUserUseCase {
  constructor(userRepository: UserRepository, hashRepository: HashGenerator) {
    super(userRepository, hashRepository)
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
