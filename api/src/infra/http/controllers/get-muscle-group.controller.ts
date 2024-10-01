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
import { GetMuscleGroupUseCase } from '@/domain/gym/application/use-cases/get-muscle-group'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { MuscleGroupPresenter } from '../presenters/muscle-group-presenter'

const idSchema = z.string().transform(Number).pipe(z.number().min(1))

const idValidationPipe = new ZodValidationPipe(idSchema)

type IdSchema = z.infer<typeof idSchema>

@ApiTags('muscle-group')
@Public()
@Controller('/muscle-groups/:id')
export class GetMuscleGroupController {
  constructor(private getMuscleGroup: GetMuscleGroupUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Get muscle group information',
  })
  @ApiResponse({
    status: 200,
    description: 'Muscle group information retrieved successfully',
    schema: {
      example: {
        muscleGroup: {
          id: 1,
          description: 'Biceps',
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
    const result = await this.getMuscleGroup.execute({
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
      muscleGroup: MuscleGroupPresenter.toHTTP(result.value.muscleGroup),
    }
  }
}
