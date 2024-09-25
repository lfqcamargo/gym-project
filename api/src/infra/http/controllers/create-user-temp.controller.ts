import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { CreateUserTempUseCase } from '@/domain/users/application/use-cases/create-user-temp'
import { AlreadyExistsEmailError } from '@/domain/users/application/use-cases/errors/already-exists-email-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

extendZodWithOpenApi(z)

const bodySchema = z.object({
  email: z.string().email().openapi({ description: 'teste' }),
  name: z.string(),
  password: z.string(),
})

type BodySchema = z.infer<typeof bodySchema>

@ApiTags('sessions')
@Controller('/users')
@Public()
export class CreateUserTempController {
  constructor(private createUserTemp: CreateUserTempUseCase) {}

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
