import { Injectable, Logger } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

import { UserRepository } from '../repositories/user-repository'
import { UserTempRepository } from '../repositories/user-temp-repository'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'

interface CreateUserTempUseCaseRequest {
  email: string
  name: string
  password: string
}

type CreateUserTempUseCaseResponse = Either<AlreadyExistsEmailError, null>

@Injectable()
export class CreateUserTempUseCase {
  private readonly logger = new Logger(CreateUserTempUseCase.name)
  constructor(
    private userTempRepository: UserTempRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserTempUseCaseRequest): Promise<CreateUserTempUseCaseResponse> {
    const alreadyEmailUser = await this.userRepository.findByEmail(email)

    if (alreadyEmailUser) {
      return left(new AlreadyExistsEmailError())
    }

    const userTemp = await this.userTempRepository.findByEmail(email)
    if (userTemp) {
      userTemp.updateDetails(name, password)

      await this.userTempRepository.save(userTemp)
      this.logger.log(`User Temp Token: ${userTemp.token}`)
      return right(null)
    }

    const user = UserTemp.create({
      email,
      name,
      password,
    })

    await this.userTempRepository.create(user)

    this.logger.log(`User Temp Token: ${user.token}`)

    return right(null)
  }
}
