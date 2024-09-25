import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetProfileBySlugUseCase } from '@/domain/users/application/use-cases/get-profile-by-slug'
import { Public } from '@/infra/auth/public'

import { ProfilePresenter } from '../presenters/profile-presenter'

@ApiTags('users')
@Controller('/profiles/:slug')
@Public()
export class GetProfileBySlugController {
  constructor(private getProfileBySlug: GetProfileBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getProfileBySlug.execute({ slug })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestException(error.message)
        default:
          throw new InternalServerErrorException(error.message)
      }
    }

    return { profile: ProfilePresenter.toHTTP(result.value.profile) }
  }
}
