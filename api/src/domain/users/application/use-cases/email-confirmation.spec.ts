import { makeUserTemp } from 'test/factories/make-user-temp'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryUsersTempRepository } from 'test/repositories/in-memory-users-temp-repository'

import { CreateUserUseCase } from './create-user'
import { EmailConfirmationUseCase } from './email-confirmation'

let inMemoryUsersTempRepository: InMemoryUsersTempRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: EmailConfirmationUseCase

describe('Confirmation Email', () => {
  beforeEach(() => {
    inMemoryUsersTempRepository = new InMemoryUsersTempRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    sut = new EmailConfirmationUseCase(
      inMemoryUsersTempRepository,
      createUserUseCase,
    )
  })

  it('should be able to confirmation email', async () => {
    const userTemp = makeUserTemp()
    await inMemoryUsersTempRepository.create(userTemp)

    const result = await sut.execute({ token: userTemp.token })

    expect(result.isRight()).toBe(true)
  })
})
