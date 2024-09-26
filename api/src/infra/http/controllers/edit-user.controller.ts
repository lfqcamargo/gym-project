import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditUserUseCase } from '@/domain/users/application/use-cases/edit-user'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { EditUserDto, editUserSchema } from './dtos/edit-user.dto'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Edit user information' })
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data or user not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async handle(
    @Body(new ZodValidationPipe(editUserSchema))
    body: EditUserDto,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, password } = body
    const id = user.sub

    const result = await this.editUser.execute({
      id,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestException(error.message)
        default:
          throw new InternalServerErrorException(error.message)
      }
    }
  }
}
