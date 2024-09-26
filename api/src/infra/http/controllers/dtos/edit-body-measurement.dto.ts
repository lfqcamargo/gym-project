import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const editBodyMeasurementSchema = z.object({
  leftRelaxedArm: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
  rightRelaxedArm: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
  leftContractedArm: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
  rightContractedArm: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
  leftForearm: z.number().min(0, { message: 'Measurement must be positive' }),
  rightForearm: z.number().min(0, { message: 'Measurement must be positive' }),
  leftThigh: z.number().min(0, { message: 'Measurement must be positive' }),
  rightThigh: z.number().min(0, { message: 'Measurement must be positive' }),
  leftCalf: z.number().min(0, { message: 'Measurement must be positive' }),
  rightCalf: z.number().min(0, { message: 'Measurement must be positive' }),
  relaxedChest: z.number().min(0, { message: 'Measurement must be positive' }),
  inspiredChest: z.number().min(0, { message: 'Measurement must be positive' }),
  waist: z.number().min(0, { message: 'Measurement must be positive' }),
  abdomen: z.number().min(0, { message: 'Measurement must be positive' }),
  hip: z.number().min(0, { message: 'Measurement must be positive' }),
  neck: z.number().min(0, { message: 'Measurement must be positive' }),
  shoulder: z.number().min(0, { message: 'Measurement must be positive' }),
  upperSkinfolds: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
  lowerSkinfolds: z
    .number()
    .min(0, { message: 'Measurement must be positive' }),
})

export class EditBodyMeasurementDto extends createZodDto(
  editBodyMeasurementSchema,
) {
  @ApiProperty({
    example: 32.5,
    description: 'Left relaxed arm measurement in centimeters',
    type: Number,
  })
  leftRelaxedArm!: number

  @ApiProperty({
    example: 33.0,
    description: 'Right relaxed arm measurement in centimeters',
    type: Number,
  })
  rightRelaxedArm!: number

  @ApiProperty({
    example: 35.5,
    description: 'Left contracted arm measurement in centimeters',
    type: Number,
  })
  leftContractedArm!: number

  @ApiProperty({
    example: 36.0,
    description: 'Right contracted arm measurement in centimeters',
    type: Number,
  })
  rightContractedArm!: number

  @ApiProperty({
    example: 28.5,
    description: 'Left forearm measurement in centimeters',
    type: Number,
  })
  leftForearm!: number

  @ApiProperty({
    example: 29.0,
    description: 'Right forearm measurement in centimeters',
    type: Number,
  })
  rightForearm!: number

  @ApiProperty({
    example: 58.0,
    description: 'Left thigh measurement in centimeters',
    type: Number,
  })
  leftThigh!: number

  @ApiProperty({
    example: 58.5,
    description: 'Right thigh measurement in centimeters',
    type: Number,
  })
  rightThigh!: number

  @ApiProperty({
    example: 38.0,
    description: 'Left calf measurement in centimeters',
    type: Number,
  })
  leftCalf!: number

  @ApiProperty({
    example: 38.5,
    description: 'Right calf measurement in centimeters',
    type: Number,
  })
  rightCalf!: number

  @ApiProperty({
    example: 100.0,
    description: 'Relaxed chest measurement in centimeters',
    type: Number,
  })
  relaxedChest!: number

  @ApiProperty({
    example: 105.0,
    description: 'Inspired chest measurement in centimeters',
    type: Number,
  })
  inspiredChest!: number

  @ApiProperty({
    example: 85.0,
    description: 'Waist measurement in centimeters',
    type: Number,
  })
  waist!: number

  @ApiProperty({
    example: 90.0,
    description: 'Abdomen measurement in centimeters',
    type: Number,
  })
  abdomen!: number

  @ApiProperty({
    example: 95.0,
    description: 'Hip measurement in centimeters',
    type: Number,
  })
  hip!: number

  @ApiProperty({
    example: 40.0,
    description: 'Neck measurement in centimeters',
    type: Number,
  })
  neck!: number

  @ApiProperty({
    example: 50.0,
    description: 'Shoulder measurement in centimeters',
    type: Number,
  })
  shoulder!: number

  @ApiProperty({
    example: 20.0,
    description: 'Upper skinfolds measurement in millimeters',
    type: Number,
  })
  upperSkinfolds!: number

  @ApiProperty({
    example: 15.0,
    description: 'Lower skinfolds measurement in millimeters',
    type: Number,
  })
  lowerSkinfolds!: number
}
