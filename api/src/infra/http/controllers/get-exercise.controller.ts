import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetExerciseUseCase } from '@/domain/gym/application/use-cases/get-exercise'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ExercisePresenter } from '../presenters/exercise-presenter'

const idSchema = z.string().transform(Number).pipe(z.number().min(1))

const idValidationPipe = new ZodValidationPipe(idSchema)

type IdSchema = z.infer<typeof idSchema>

@ApiTags('exercises')
@Public()
@Controller('/exercises/:id')
export class GetExerciseController {
  constructor(private getExercise: GetExerciseUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Get exercise information',
  })
  @ApiResponse({
    status: 200,
    description: 'Exercise information retrieved successfully',
    schema: {
      example: {
        exercise: {
          id: 1,
          name: 'Exercise',
          description: 'Exercise',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Resource not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation failed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async handle(@Param('id', idValidationPipe) id: IdSchema) {
    const result = await this.getExercise.execute({
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
      exercise: ExercisePresenter.toHTTP(result.value.exercise),
    }
  }
}
