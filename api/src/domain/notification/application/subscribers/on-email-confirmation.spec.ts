import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { OnEmailConfirmationCreated } from '@/domain/notification/application/subscribers/on-email-confirmation'

let inMemoryUsersRepository: InMemoryUsersRepository

describe('On User  Created', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
  })

  it('should  send a notification when an user  is created', async () => {
    const _onEmailConfirmationCreated = new OnEmailConfirmationCreated()

    const { user } = makeUser()

    inMemoryUsersRepository.create(user)
  })
})
