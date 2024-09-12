import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'

interface EditUserUseCaseRequest {
  id: string
  name?: string
  password?: string
}

type EditUserUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    id,
    name,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      user.name = name
    }

    if (password) {
      user.password = await this.hashGenerator.hash(password)
    }

    await this.userRepository.save(user)

    return right(null)
  }
}
