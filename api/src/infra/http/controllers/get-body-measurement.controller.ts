import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetBodyMeasurementUseCase } from '@/domain/users/application/use-cases/get-body-measurement'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { BodyMeasurementPresenter } from '../presenters/body-measurement-presenter'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/body-measurement')
export class GetBodyMeasurementController {
  constructor(private getBodyMeasurement: GetBodyMeasurementUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Get body measurement information for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Body measurement information retrieved successfully',
    schema: {
      example: {
        bodyMeasurement: {
          leftRelaxedArm: 32.5,
          rightRelaxedArm: 33.0,
          leftContractedArm: 35.5,
          rightContractedArm: 36.0,
          leftForearm: 28.5,
          rightForearm: 29.0,
          leftThigh: 58.0,
          rightThigh: 58.5,
          leftCalf: 38.0,
          rightCalf: 38.5,
          relaxedChest: 100.0,
          inspiredChest: 105.0,
          waist: 85.0,
          abdomen: 90.0,
          hip: 95.0,
          neck: 40.0,
          shoulder: 50.0,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Resource not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async handle(@CurrentUser() user: UserPayload) {
    const id = user.sub

    const result = await this.getBodyMeasurement.execute({
      id,
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
    return {
      bodyMeasurement: BodyMeasurementPresenter.toHTTP(
        result.value.bodyMeasurement,
      ),
    }
  }
}
