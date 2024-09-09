import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { Either, left, right } from '@/core/either'

import { UserTempRepository } from '../repositories/user-temp-repository'
import { CreateUserUseCase } from './create-user'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'
import { TokenExpiredError } from './errors/token-expired-error'
import { TokenNotFoundError } from './errors/token-not-found-error'

interface EmailConfirmationUseCaseRequest {
  token: string
}

type EmailConfirmationTempUseCaseResponse = Either<
  TokenExpiredError | TokenNotFoundError | AlreadyExistsEmailError,
  null
>

@Injectable()
export class EmailConfirmationUseCase {
  constructor(
    private userTempRepository: UserTempRepository,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async execute({
    token,
  }: EmailConfirmationUseCaseRequest): Promise<EmailConfirmationTempUseCaseResponse> {
    const userTemp = await this.userTempRepository.findByToken(token)

    if (!userTemp) {
      return left(new TokenNotFoundError())
    }

    const tokenExpired = dayjs(userTemp.tokenExpiration).isBefore(dayjs())

    if (tokenExpired) {
      return left(new TokenExpiredError())
    }

    const result = await this.createUserUseCase.execute({
      email: userTemp.email,
      name: userTemp.name,
      password: userTemp.password,
    })

    if (result.isLeft()) {
      return left(result.value)
    }

    await this.userTempRepository.delete(userTemp.id.toString())

    return right(null)
  }
}
