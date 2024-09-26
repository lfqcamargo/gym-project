import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Patch,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditProfileUseCase } from '@/domain/users/application/use-cases/edit-profile'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { EditProfileDto, editProfileSchema } from './dtos/edit-profile.dto'

const bodyValidationPipe = new ZodValidationPipe(editProfileSchema)

@ApiTags('users')
@ApiBearerAuth()
@Controller('/profiles')
export class EditProfileController {
  constructor(private editprofile: EditProfileUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Edit user profile' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data or profile not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
    ]),
  )
  async handle(
    @Body(bodyValidationPipe) body: EditProfileDto,
    @UploadedFiles()
    files: {
      profilePhoto?: Express.Multer.File[]
      coverPhoto?: Express.Multer.File[]
    },
    @CurrentUser()
    profile: UserPayload,
  ) {
    const profilePhoto = files.profilePhoto
      ? files.profilePhoto[0]?.buffer
      : null
    const coverPhoto = files.coverPhoto ? files.coverPhoto[0]?.buffer : null
    const { description } = body
    const id = profile.sub

    const result = await this.editprofile.execute({
      id,
      description,
      profilePhoto,
      coverPhoto,
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
