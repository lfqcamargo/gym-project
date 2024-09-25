import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetBodyMeasurementUseCase } from '@/domain/users/application/use-cases/get-body-measurement'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { BodyMeasurementPresenter } from '../presenters/body-measurement-presenter'

@ApiTags('users')
@Controller('/body-measurement')
export class GetBodyMeasurementController {
  constructor(private getBodyMeasurement: GetBodyMeasurementUseCase) {}

  @Get()
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
