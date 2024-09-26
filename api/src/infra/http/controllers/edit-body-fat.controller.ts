import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Put,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditBodyFatUseCase } from '@/domain/users/application/use-cases/edit-body-fat'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { bodyFatSchema, EditBodyFatDto } from './dtos/edit-body-fat.dto'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/body-fat')
export class EditBodyFatController {
  constructor(private editBodyFatUseCase: EditBodyFatUseCase) {}

  @Put()
  @ApiOperation({ summary: 'Edit body fat measurements' })
  @ApiResponse({
    status: 200,
    description: 'Body fat measurements updated successfully',
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
    @Body(new ZodValidationPipe(bodyFatSchema)) body: EditBodyFatDto,
    @CurrentUser() user: UserPayload,
  ) {
    const id = user.sub

    const result = await this.editBodyFatUseCase.execute({
      id,
      ...body,
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
