import dayjs from 'dayjs'
import { FakeHasher } from 'test/cryptography/fake-haser'
import { makeUser } from 'test/factories/make-user'
import { makeUserTemp } from 'test/factories/make-user-temp'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryUsersTempRepository } from 'test/repositories/in-memory-users-temp-repository'

import { CreateUserTempUseCase } from './create-user-temp'
import { AlreadyExistsEmailError } from './errors/already-exists-email-error'

let inMemoryUsersTempRepository: InMemoryUsersTempRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: CreateUserTempUseCase

describe('Create new User', () => {
  beforeEach(() => {
    inMemoryUsersTempRepository = new InMemoryUsersTempRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateUserTempUseCase(
      inMemoryUsersTempRepository,
      inMemoryUsersRepository,
      fakeHasher,
    )
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      email: 'lfqcamargo@gmail.com',
      name: 'Lucas Camargo',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersTempRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
  it('should not be able to create a new user with an existing email', async () => {
    const oldUser = makeUser({ email: 'lfqcamargo@gmail.com' })
    await inMemoryUsersRepository.create(oldUser)

    const newUser = makeUser({ email: 'lfqcamargo@gmail.com' })
    const result = await sut.execute(newUser)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsEmailError)
  })

  it('should update your data if you already have a temporary email address', async () => {
    makeUserTemp({ email: 'lfqcamargo@gmail.com' })

    const result = await sut.execute({
      email: 'lfqcamargo@gmail.com',
      name: 'Lucas Camargo',
      password: '123456',
    })

    const newUser = inMemoryUsersTempRepository.items[0]
    const hashedPassword = await fakeHasher.hash('123456')
    const oneDayAhead = dayjs().add(1, 'day').toDate()

    expect(result.isRight()).toBe(true)

    expect(dayjs(newUser.tokenExpiration).isSame(oneDayAhead, 'day')).toBe(true)
    expect(newUser).toEqual(
      expect.objectContaining({
        email: 'lfqcamargo@gmail.com',
        name: 'Lucas Camargo',
        password: hashedPassword,
      }),
    )
  })
})
