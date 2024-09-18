import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { BodyFat } from '../../enterprise/entities/body-fat'
import { BodyFatRepository } from '../repositories/body-fat-repository'
import { UserRepository } from '../repositories/user-repository'

interface EditBodyFatUseCaseRequest {
  id: string
  subscapular: number
  triceps: number
  biceps: number
  chest: number
  midAxillary: number
  suprailiac: number
  abdominal: number
  medialThigh: number
  medialCalf: number
}

type EditBodyFatUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class EditBodyFatUseCase {
  constructor(
    private bodyFatRepository: BodyFatRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    id,
    subscapular,
    triceps,
    biceps,
    chest,
    midAxillary,
    suprailiac,
    abdominal,
    medialThigh,
    medialCalf,
  }: EditBodyFatUseCaseRequest): Promise<EditBodyFatUseCaseResponse> {
    const bodyFat = await this.bodyFatRepository.findById(id)

    if (!bodyFat) {
      const user = await this.userRepository.findById(id)

      if (!user) {
        return left(new ResourceNotFoundError())
      }

      const newBodyFat = BodyFat.create(
        {
          subscapular,
          triceps,
          biceps,
          chest,
          midAxillary,
          suprailiac,
          abdominal,
          medialThigh,
          medialCalf,
        },
        user.id,
      )

      await this.bodyFatRepository.create(newBodyFat)
    } else {
      bodyFat.subscapular = subscapular
      bodyFat.triceps = triceps
      bodyFat.biceps = biceps
      bodyFat.chest = chest
      bodyFat.midAxillary = midAxillary
      bodyFat.suprailiac = suprailiac
      bodyFat.abdominal = abdominal
      bodyFat.medialThigh = medialThigh
      bodyFat.medialCalf = medialCalf

      await this.bodyFatRepository.save(bodyFat)
    }

    return right(null)
  }
}
