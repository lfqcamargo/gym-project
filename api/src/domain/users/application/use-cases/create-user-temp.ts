import { Either, left, right } from '@/core/either'
import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'
import { UserTempRepository } from '../repositories/user-temp-repository'
import { AlreadyExistsCpfError } from './errors/already-exists-cpf-error'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'

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
  ) {}

  async execute({
    cpf,
    email,
    name,
    password,
  }: CreateUserTempUseCaseRequest): Promise<CreateUserTempUseCaseResponse> {
    const alreadyEmailUser = await this.userRepository.findByEmail(email)

    if (alreadyEmailUser) {
      return left(new AlreadyExistsEmailError())
    }

    const alreadycpf = await this.userRepository.findByCPF(cpf)

    if (alreadycpf) {
      return left(new AlreadyExistsCpfError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const userTemp = await this.userTempRepository.findByEmail(email)

    if (userTemp) {
      userTemp.updateDetails(cpf, name, hashedPassword)

      await this.userTempRepository.save(userTemp)

      return right(null)
    }

    const user = UserTemp.create({
      cpf,
      email,
      name,
      password: hashedPassword,
    })

    await this.userTempRepository.create(user)

    return right(null)
  }
}
