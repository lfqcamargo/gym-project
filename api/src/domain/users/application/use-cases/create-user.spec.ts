import { FakeHasher } from 'test/cryptography/fake-haser'
import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateUserUseCase } from './create-user'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilesRepository: InMemoryProfilesRepository
let fakeHasher: FakeHasher
let sut: CreateUserUseCase

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateUserUseCase(
      inMemoryUsersRepository,
      inMemoryProfilesRepository,
      fakeHasher,
    )
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      email: 'lfqcamargo@gmail.com',
      name: 'Lucas Camargo',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items.length).toBe(1)
    expect(inMemoryProfilesRepository.items.length).toBe(1)
    expect(inMemoryUsersRepository.items[0].email).toEqual(
      'lfqcamargo@gmail.com',
    )
    expect(inMemoryUsersRepository.items[0].password).not.toEqual('123456')
  })

  it('should not be able to create a new user with an existing email', async () => {
    const { user: oldUser } = makeUser({ email: 'lfqcamargo@gmail.com' })
    await inMemoryUsersRepository.create(oldUser)

    const result = await sut.execute({
      email: 'lfqcamargo@gmail.com',
      name: 'Lucas Camargo',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsEmailError)
  })
})
