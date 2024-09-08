import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { AlreadyExistsEmailError } from '@/domain/users/application/use-cases/errors/already-exists-email-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NestCreateUserTempUseCase } from '@/infra/injectables/nest-user-temp-use-case'

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/users')
@Public()
export class CreateUserTempController {
  constructor(private createUserTemp: NestCreateUserTempUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { email, name, password } = await bodySchema.parseAsync(body)

    const result = await this.createUserTemp.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AlreadyExistsEmailError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
