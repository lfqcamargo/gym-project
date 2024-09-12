import { BadRequestException, Body, Controller, Patch } from '@nestjs/common'
import { z } from 'zod'

import { EditUserUseCase } from '@/domain/users/application/use-cases/edit-user'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z.string().optional(),
  password: z.string().optional(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/users')
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}

  @Patch()
  async handle(
    @Body(new ZodValidationPipe(bodySchema))
    body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, password } = body
    const id = user.sub

    const result = await this.editUser.execute({
      id,
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error.message)
    }
  }
}
