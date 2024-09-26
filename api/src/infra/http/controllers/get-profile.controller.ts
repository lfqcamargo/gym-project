import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetProfileUseCase } from '@/domain/users/application/use-cases/get-profile'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ProfilePresenter } from '../presenters/profile-presenter'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/profiles')
export class GetProfileController {
  constructor(private getProfile: GetProfileUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile information retrieved successfully',
    schema: {
      example: {
        profile: {
          name: 'John Doe',
          description: 'A software developer with a passion for coding',
          profilePhotoUrl: 'https://example.com/profile-photo.jpg',
          coverPhotoUrl: 'https://example.com/cover-photo.jpg',
          createdAt: '2023-09-15T10:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Resource not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async handle(@CurrentUser() profile: UserPayload) {
    const id = profile.sub

    const result = await this.getProfile.execute({
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
    return { profile: ProfilePresenter.toHTTP(result.value.profile) }
  }
}
