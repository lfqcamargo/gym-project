import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetProfileUseCase } from '@/domain/users/application/use-cases/get-profile'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ProfilePresenter } from '../presenters/profile-presenter'

@ApiTags('users')
@Controller('/profiles')
export class GetProfileController {
  constructor(private getProfile: GetProfileUseCase) {}

  @Get()
  async handle(@CurrentUser() profile: UserPayload) {
    const id = profile.sub

    const result = await this.getProfile.execute({
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
    return { profile: ProfilePresenter.toHTTP(result.value.profile) }
  }
}
