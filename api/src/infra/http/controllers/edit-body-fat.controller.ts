import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditBodyFatUseCase } from '@/domain/users/application/use-cases/edit-body-fat'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  subscapular: z.number(),
  triceps: z.number(),
  biceps: z.number(),
  chest: z.number(),
  midAxillary: z.number(),
  suprailiac: z.number(),
  abdominal: z.number(),
  medialThigh: z.number(),
  medialCalf: z.number(),
})

type BodySchema = z.infer<typeof bodySchema>

@ApiTags('users')
@Controller('/body-fat')
export class EditBodyFatController {
  constructor(private editBodyFatUseCase: EditBodyFatUseCase) {}

  @Put()
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const id = user.sub

    const result = await this.editBodyFatUseCase.execute({
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
