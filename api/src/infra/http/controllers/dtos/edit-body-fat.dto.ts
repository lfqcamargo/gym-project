import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const bodyFatSchema = z.object({
  subscapular: z
    .number()
    .min(0, { message: 'Subscapular measurement must be positive' }),
  triceps: z
    .number()
    .min(0, { message: 'Triceps measurement must be positive' }),
  biceps: z.number().min(0, { message: 'Biceps measurement must be positive' }),
  chest: z.number().min(0, { message: 'Chest measurement must be positive' }),
  midAxillary: z
    .number()
    .min(0, { message: 'MidAxillary measurement must be positive' }),
  suprailiac: z
    .number()
    .min(0, { message: 'Suprailiac measurement must be positive' }),
  abdominal: z
    .number()
    .min(0, { message: 'Abdominal measurement must be positive' }),
  medialThigh: z
    .number()
    .min(0, { message: 'MedialThigh measurement must be positive' }),
  medialCalf: z
    .number()
    .min(0, { message: 'MedialCalf measurement must be positive' }),
})

export class EditBodyFatDto extends createZodDto(bodyFatSchema) {
  @ApiProperty({
    example: 12.5,
    description: 'Subscapular skinfold measurement in millimeters',
    type: Number,
  })
  subscapular!: number

  @ApiProperty({
    example: 10.3,
    description: 'Triceps skinfold measurement in millimeters',
    type: Number,
  })
  triceps!: number

  @ApiProperty({
    example: 9.4,
    description: 'Biceps skinfold measurement in millimeters',
    type: Number,
  })
  biceps!: number

  @ApiProperty({
    example: 15.2,
    description: 'Chest skinfold measurement in millimeters',
    type: Number,
  })
  chest!: number

  @ApiProperty({
    example: 8.7,
    description: 'Mid-axillary skinfold measurement in millimeters',
    type: Number,
  })
  midAxillary!: number

  @ApiProperty({
    example: 11.1,
    description: 'Suprailiac skinfold measurement in millimeters',
    type: Number,
  })
  suprailiac!: number

  @ApiProperty({
    example: 14.5,
    description: 'Abdominal skinfold measurement in millimeters',
    type: Number,
  })
  abdominal!: number

  @ApiProperty({
    example: 12.8,
    description: 'Medial thigh skinfold measurement in millimeters',
    type: Number,
  })
  medialThigh!: number

  @ApiProperty({
    example: 7.3,
    description: 'Medial calf skinfold measurement in millimeters',
    type: Number,
  })
  medialCalf!: number
}
