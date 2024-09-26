import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetBodyFatBySlugUseCase } from '@/domain/users/application/use-cases/get-body-fat-by-slug'
import { Public } from '@/infra/auth/public'

import { BodyFatPresenter } from '../presenters/body-fat-presenter'

@ApiTags('users')
@Controller('/body-fat/:slug')
@Public()
export class GetBodyFatBySlugController {
  constructor(private getBodyFatBySlug: GetBodyFatBySlugUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get body fat information by slug' })
  @ApiResponse({
    status: 200,
    description: 'Body fat information retrieved successfully',
    schema: {
      example: {
        bodyfat: {
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
  async handle(@Param('slug') slug: string) {
    const result = await this.getBodyFatBySlug.execute({ slug })

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
      bodyfat: BodyFatPresenter.toHTTP(result.value.bodyfat),
    }
  }
}
