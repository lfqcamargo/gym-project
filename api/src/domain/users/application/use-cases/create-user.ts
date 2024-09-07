import { Either, left, right } from '@/core/either'
import { User } from '@/domain/users/enterprise/entities/user'

import { UserRepository } from '../repositories/user-repository'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'

interface CreateUserUseCaseRequest {
  email: string
  name: string
  password: string
}

type CreateUserUseCaseResponse = Either<AlreadyExistsEmailError, null>

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const alreadyEmailUser = await this.userRepository.findByEmail(email)

    if (alreadyEmailUser) {
      return left(new AlreadyExistsEmailError())
    }

    const user = User.create({
      email,
      name,
      password,
    })

    await this.userRepository.create(user)

    return right(null)
  }
}
