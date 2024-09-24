import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetBodyFatUseCase } from '@/domain/users/application/use-cases/get-body-fat'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { BodyFatPresenter } from '../presenters/body-fat-presenter'

@Controller('/body-fat')
export class GetBodyFatController {
  constructor(private getBodyFat: GetBodyFatUseCase) {}

  @Get()
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
