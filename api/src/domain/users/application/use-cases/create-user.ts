import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { User } from '@/domain/users/enterprise/entities/user'

import { HashGenerator } from '../cryptography/hash-generator'
import { ProfileRepository } from '../repositories/profile-repository'
import { UserRepository } from '../repositories/user-repository'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'
import { Slug } from './value-objects/slug'

interface CreateUserUseCaseRequest {
  email: string
  name: string
  password: string
}

type CreateUserUseCaseResponse = Either<AlreadyExistsEmailError, null>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const alreadyEmailUser = await this.userRepository.findByEmail(email)

    if (alreadyEmailUser) {
      return left(new AlreadyExistsEmailError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    let slugValue = Slug.createFromText(name).value
    const baseSlug = slugValue
    let suffix = 1

    while (await this.userRepository.findBySlug(slugValue)) {
      slugValue = `${baseSlug}-${suffix}`
      suffix++
    }

    const slug = Slug.create(slugValue)

    const { user, profile } = User.create({
      email,
      name,
      password: hashedPassword,
      slug,
    })

    await this.userRepository.create(user)
    await this.profileRepository.create(profile)

    return right(null)
  }
}
