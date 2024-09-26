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
import { GetBodyFatUseCase } from '@/domain/users/application/use-cases/get-body-fat'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { BodyFatPresenter } from '../presenters/body-fat-presenter'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/body-fat')
export class GetBodyFatController {
  constructor(private getBodyFat: GetBodyFatUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Get body fat information for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Body fat information retrieved successfully',
    schema: {
      example: {
        bodyFat: {
          subscapular: 12.3,
          triceps: 9.4,
          biceps: 11.2,
          chest: 15.7,
          midAxillary: 10.8,
          suprailiac: 8.6,
          abdominal: 14.1,
          medialThigh: 13.5,
          medialCalf: 7.9,
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

    const result = await this.getBodyFat.execute({
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
      bodyFat: BodyFatPresenter.toHTTP(result.value.bodyFat),
    }
  }
}
