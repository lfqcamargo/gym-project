import {
  BadRequestException,
  Controller,
  Get,
  GoneException,
  NotFoundException,
  Param,
} from '@nestjs/common'

import { EmailConfirmationUseCase } from '@/domain/users/application/use-cases/email-confirmation'
import { TokenExpiredError } from '@/domain/users/application/use-cases/errors/token-expired-error'
import { TokenNotFoundError } from '@/domain/users/application/use-cases/errors/token-not-found-error'
import { Public } from '@/infra/auth/public'

@Controller('/confirmation/:token')
@Public()
export class EmailConfirmationController {
  constructor(private emailConfirmation: EmailConfirmationUseCase) {}

  @Get()
  async handle(@Param('token') token: string) {
    const result = await this.emailConfirmation.execute({
      token,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case TokenExpiredError:
          throw new GoneException(error.message)
        case TokenNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
