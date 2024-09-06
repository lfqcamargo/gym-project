import { UserRepository } from '../repositories/user-repository'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {}
}
