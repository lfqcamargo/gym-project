import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateUserTempUseCase } from '@/domain/users/application/use-cases/create-user-temp'
import { AlreadyExistsEmailError } from '@/domain/users/application/use-cases/errors/already-exists-email-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import {
  bodyCreateUserSchema,
  BodyCreateUserSchemaDto,
} from './dtos/create-user-temp.dto'

@ApiTags('users')
@Controller('/users')
@Public()
export class CreateUserTempController {
  constructor(private createUserTemp: CreateUserTempUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a temporary user' })
  @ApiResponse({
    status: 201,
    description: 'Temporary user created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
  })
  @UsePipes(new ZodValidationPipe(bodyCreateUserSchema))
  async handle(@Body() body: BodyCreateUserSchemaDto) {
    console.log(body)
    const { email, name, password } =
      await bodyCreateUserSchema.parseAsync(body)

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
