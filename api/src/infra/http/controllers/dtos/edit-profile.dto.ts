import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const editProfileSchema = z.object({
  description: z.string().optional(),
  profilePhoto: z.instanceof(Buffer).optional(),
  coverPhoto: z.instanceof(Buffer).optional(),
})

export class EditProfileDto extends createZodDto(editProfileSchema) {
  @ApiProperty({
    example: 'Software developer with a passion for open-source projects.',
    description: 'A brief description about the user',
    required: false,
    type: String,
  })
  description?: string

  @ApiProperty({
    description: 'Profile photo as a file (image)',
    required: false,
    type: 'string',
    format: 'binary',
  })
  profilePhoto?: Buffer

  @ApiProperty({
    description: 'Cover photo as a file (image)',
    required: false,
    type: 'string',
    format: 'binary',
  })
  coverPhoto?: Buffer
}
