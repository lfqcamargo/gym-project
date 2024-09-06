import dayjs from 'dayjs'

import { Either, left, right } from '@/core/either'

import { UserTempRepository } from '../repositories/user-temp-repository'
import { CreateUserUseCase } from './create-user'
import { TokenExpiredError } from './errors/token-expired-error'
import { TokenNotFoundError } from './errors/token-not-found-error'

interface EmailConfirmationUseCaseRequest {
  token: string
}

type EmailConfirmationTempUseCaseResponse = Either<TokenExpiredError, null>

export class EmailConfirmationUseCase {
  constructor(
    private userTempRepository: UserTempRepository,
    private createUserRepostiory: CreateUserUseCase,
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

    // await this.createUserRepostiory.execute()

    return right(null)
  }
}
