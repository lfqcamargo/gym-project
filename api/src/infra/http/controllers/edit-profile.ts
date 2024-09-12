import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { z } from 'zod'

import { EditProfileUseCase } from '@/domain/users/application/use-cases/edit-profile'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const bodySchema = z.object({
  description: z.string().optional(),
  profilePhoto: z.instanceof(Buffer).optional(),
  coverPhoto: z.instanceof(Buffer).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/profiles')
export class EditProfileController {
  constructor(private editprofile: EditProfileUseCase) {}

  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'coverPhoto', maxCount: 1 },
    ]),
  )
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
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
      throw new BadRequestException(error.message)
    }
  }
}
