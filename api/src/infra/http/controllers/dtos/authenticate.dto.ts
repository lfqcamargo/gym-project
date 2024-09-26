import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const authenticateBodySchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  password: z.string(),
})

export class AuthenticateBodySchemaDto extends createZodDto(
  authenticateBodySchema,
) {
  @ApiProperty({
    example: 'lfqcamargo@gmail.com',
    description: 'Email of the user',
    type: String,
  })
  email!: string

  @ApiProperty({
    example: '123456',
    description: 'Password of the user',
    type: String,
  })
  password!: string
}
