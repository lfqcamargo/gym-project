import {
  BadRequestException,
  Controller,
  Get,
  GoneException,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { EmailConfirmationUseCase } from '@/domain/users/application/use-cases/email-confirmation'
import { TokenExpiredError } from '@/domain/users/application/use-cases/errors/token-expired-error'
import { TokenNotFoundError } from '@/domain/users/application/use-cases/errors/token-not-found-error'
import { Public } from '@/infra/auth/public'

@ApiTags('sessions')
@Controller('/confirmation/:token')
@Public()
export class EmailConfirmationController {
  constructor(private emailConfirmation: EmailConfirmationUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Confirm user email using a token' })
  @ApiParam({
    name: 'token',
    description: 'Token used for email confirmation',
    example: '0671b0d8-6285-4d44-b206-f4f1fb52816c',
    required: true,
    type: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Email confirmed successfully',
  })
  @ApiResponse({
    status: 410,
    description: 'Token has expired',
  })
  @ApiResponse({
    status: 404,
    description: 'Token not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid token',
  })
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
