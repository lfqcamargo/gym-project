import { Either, left, right } from '@/core/either'
import { UserTemp } from '@/domain/users/enterprise/entities/userTemp'

import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'
import { AlreadyExistsCpfError } from './errors/already-exists-cpf-error'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'
import { UserTempRepository } from '../repositories/userTemp-repository'

interface CreateUserTempUseCaseRequest {
  cpf: string
  email: string
  name: string
  password: string
}

type CreateUserTempUseCaseResponse = Either<
  AlreadyExistsCpfError | AlreadyExistsEmailError,
  null
>

export class CreateUserTempUseCase {
  constructor(
    private userTempRepository: UserTempRepository,
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({
    cpf,
    email,
    name,
    password,
  }: CreateUserTempUseCaseRequest): Promise<CreateUserTempUseCaseResponse> {
    const alreadyEmail = await this.userRepository.findByEmail(email)

    if (alreadyEmail) {
      return left(new AlreadyExistsEmailError())
    }

    const alreadycpf = await this.userRepository.findByCPF(cpf)

    if (alreadycpf) {
      return left(new AlreadyExistsCpfError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const userTemp = UserTemp.create({
      cpf,
      email,
      name,
      password: hashedPassword,
    })

    await this.userTempRepository.create(userTemp)

    return right(null)
  }
}
