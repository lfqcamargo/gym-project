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
import { EditBodyMeasurementUseCase } from '@/domain/users/application/use-cases/edit-body-measurement'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import {
  EditBodyMeasurementDto,
  editBodyMeasurementSchema,
} from './dtos/edit-body-measurement.dto'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/body-measurements')
export class EditBodyMeasurementController {
  constructor(private editBodyMeasurementUseCase: EditBodyMeasurementUseCase) {}

  @Put()
  @ApiOperation({ summary: 'Edit body measurements' })
  @ApiResponse({
    status: 200,
    description: 'Body measurements updated successfully',
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
    @Body(new ZodValidationPipe(editBodyMeasurementSchema))
    body: EditBodyMeasurementDto,
    @CurrentUser() user: UserPayload,
  ) {
    const id = user.sub

    const result = await this.editBodyMeasurementUseCase.execute({
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
