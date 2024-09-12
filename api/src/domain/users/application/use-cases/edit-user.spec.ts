import { FakeHasher } from 'test/cryptography/fake-haser'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { vi } from 'vitest'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditUserUseCase } from './edit-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: EditUserUseCase

describe('EditUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new EditUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to update the user password', async () => {
    const { user } = makeUser({ password: 'old_password' })
    await inMemoryUsersRepository.create(user)

    const hashSpy = vi.spyOn(fakeHasher, 'hash')

    const result = await sut.execute({
      id: user.id.toString(),
      password: 'new_password',
    })

    expect(result.isRight()).toBe(true)
    expect(hashSpy).toHaveBeenCalledWith('new_password')
    expect(inMemoryUsersRepository.items[0].password).not.toEqual(
      'new_password',
    )
  })

  it('should be able to update the user name', async () => {
    const { user } = makeUser({ name: 'Old Name' })
    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      id: user.id.toString(),
      name: 'New Name',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].name).toEqual('New Name')
  })

  it('should return an error if user does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      name: 'New Name',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
