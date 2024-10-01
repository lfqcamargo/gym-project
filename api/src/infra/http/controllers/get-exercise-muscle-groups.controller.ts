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
import { GetExerciseMuscleGroupsUseCase } from '@/domain/gym/application/use-cases/get-exercise-muscle-groups'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ExerciseMuscleGroupsPresenter } from '../presenters/exercise-muscle-groups-presenter'

const idSchema = z.string().transform(Number).pipe(z.number().min(1))

const idValidationPipe = new ZodValidationPipe(idSchema)

type IdSchema = z.infer<typeof idSchema>

@ApiTags('exercise-muscle-groups')
@Public()
@Controller('/exercise-muscle-groups/:id')
export class GetExerciseMuscleGroupsController {
  constructor(
    private getExerciseMuscleGroups: GetExerciseMuscleGroupsUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get exercise muscle groups information',
  })
  @ApiResponse({
    status: 200,
    description: 'Exercise muscle groups information retrieved successfully',
    schema: {
      example: {
        exerciseMuscleGroups: {
          id: 1,
          exerciseMuscleGroupsId: 100,
          muscleGroupId: 10,
          muscleActivation: 0.85,
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
    const result = await this.getExerciseMuscleGroups.execute({
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
      exerciseMuscleGroups: ExerciseMuscleGroupsPresenter.toHTTP(
        result.value.exerciseMuscleGroups,
      ),
    }
  }
}
