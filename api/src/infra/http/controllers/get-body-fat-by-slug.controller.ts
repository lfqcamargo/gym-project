import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

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
