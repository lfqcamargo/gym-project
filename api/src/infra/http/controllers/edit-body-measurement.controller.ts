import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditBodyMeasurementUseCase } from '@/domain/users/application/use-cases/edit-body-measurement'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  leftRelaxedArm: z.number(),
  rightRelaxedArm: z.number(),
  leftContractedArm: z.number(),
  rightContractedArm: z.number(),
  leftForearm: z.number(),
  rightForearm: z.number(),
  leftThigh: z.number(),
  rightThigh: z.number(),
  leftCalf: z.number(),
  rightCalf: z.number(),
  relaxedChest: z.number(),
  inspiredChest: z.number(),
  waist: z.number(),
  abdomen: z.number(),
  hip: z.number(),
  neck: z.number(),
  shoulder: z.number(),
  upperSkinfolds: z.number(),
  lowerSkinfolds: z.number(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/body-measurements')
export class EditBodyMeasurementController {
  constructor(private editBodyMeasurementUseCase: EditBodyMeasurementUseCase) {}

  @Put()
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const id = user.sub

    const result = await this.editBodyMeasurementUseCase.execute({
      id,
      ...body,
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
  }
}
