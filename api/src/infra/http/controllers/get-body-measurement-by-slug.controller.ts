import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

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
