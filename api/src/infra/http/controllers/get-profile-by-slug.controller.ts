import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetProfileBySlugUseCase } from '@/domain/users/application/use-cases/get-profile-by-slug'
import { Public } from '@/infra/auth/public'

import { ProfilePresenter } from '../presenters/profile-presenter'

@ApiTags('users')
@Controller('/profiles/:slug')
@Public()
export class GetProfileBySlugController {
  constructor(private getProfileBySlug: GetProfileBySlugUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get profile information by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug identifier for profile',
    example: 'john-doe-profile',
    required: true,
    type: String,
  })
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
  async handle(@Param('slug') slug: string) {
    const result = await this.getProfileBySlug.execute({ slug })

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
