import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const bodyCreateUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(10, { message: 'Email must be at least 10 characters long' })
    .max(50, { message: 'Email must be no longer than 50 characters' }),
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long' })
    .max(50, { message: 'Name must be no longer than 50 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be no longer than 20 characters' }),
})

export class BodyCreateUserSchemaDto extends createZodDto(
  bodyCreateUserSchema,
) {
  @ApiProperty({
    example: 'lfqcamargo@gmail.com',
    description:
      'The email address of the user. Must be a valid email format and between 10 and 50 characters.',
  })
  email!: string

  @ApiProperty({
    example: 'Lucas Camargo',
    description:
      'The full name of the user. Must be between 5 and 50 characters.',
  })
  name!: string

  @ApiProperty({
    example: '123456',
    description:
      'The password for the user account. Must be between 6 and 20 characters.',
  })
  password!: string
}
