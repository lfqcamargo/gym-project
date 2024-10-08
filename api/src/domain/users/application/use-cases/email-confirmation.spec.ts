import { FakeHasher } from 'test/cryptography/fake-haser'
import { makeUserTemp } from 'test/factories/make-user-temp'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryUsersTempRepository } from 'test/repositories/in-memory-users-temp-repository'

import { CreateUserUseCase } from './create-user'
import { EmailConfirmationUseCase } from './email-confirmation'

let inMemoryUsersTempRepository: InMemoryUsersTempRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilesRepository: InMemoryProfilesRepository
let fakeHasher: FakeHasher
let createUserUseCase: CreateUserUseCase
let sut: EmailConfirmationUseCase

describe('Confirmation Email', () => {
  beforeEach(() => {
    inMemoryUsersTempRepository = new InMemoryUsersTempRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    fakeHasher = new FakeHasher()
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository,
      inMemoryProfilesRepository,
      fakeHasher,
    )
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
    expect(inMemoryUsersRepository.items.length).toBe(1)
    expect(inMemoryProfilesRepository.items.length).toBe(1)
    expect(inMemoryUsersTempRepository.items.length).toBe(0)
  })
})
