import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetBodyMeasurementBySlugUseCase } from '@/domain/users/application/use-cases/get-body-measurement-by-slug'
import { Public } from '@/infra/auth/public'

import { BodyMeasurementPresenter } from '../presenters/body-measurement-presenter'

@ApiTags('users')
@Controller('/body-measurement/:slug')
@Public()
export class GetBodyMeasurementBySlugController {
  constructor(
    private getBodyMeasurementBySlug: GetBodyMeasurementBySlugUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get body measurement information by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug identifier for body measurement entry',
    example: 'john-doe-body-measurement',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Body measurement information retrieved successfully',
    schema: {
      example: {
        bodymeasurement: {
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
  async handle(@Param('slug') slug: string) {
    const result = await this.getBodyMeasurementBySlug.execute({ slug })

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
      bodymeasurement: BodyMeasurementPresenter.toHTTP(
        result.value.bodymeasurement,
      ),
    }
  }
}
