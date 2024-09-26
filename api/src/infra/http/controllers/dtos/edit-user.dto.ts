import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const editUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must have at least 1 character' })
    .optional(),
  password: z
    .string()
    .min(6, { message: 'Password must have at least 6 characters' })
    .optional(),
})

export class EditUserDto extends createZodDto(editUserSchema) {
  @ApiProperty({
    example: 'Lucas Camargo',
    description: 'The name of the user',
    required: false,
    type: String,
  })
  name?: string

  @ApiProperty({
    example: 'newpassword123',
    description: 'The password of the user (min 6 characters)',
    required: false,
    type: String,
  })
  password?: string
}
