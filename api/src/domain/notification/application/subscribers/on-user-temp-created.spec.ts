import { makeUserTemp } from 'test/factories/make-user-temp'
import { InMemoryUsersTempRepository } from 'test/repositories/in-memory-users-temp-repository'

import { OnUserTempCreated } from '@/domain/notification/application/subscribers/on-user-temp-created'

let inMemoryUsersTempRepository: InMemoryUsersTempRepository

describe('On User Temp Created', () => {
  beforeEach(() => {
    inMemoryUsersTempRepository = new InMemoryUsersTempRepository()
  })

  it('should  send a notification when an user temp is created', async () => {
    const _onUserTempCreated = new OnUserTempCreated()

    const userTemp = makeUserTemp()

    inMemoryUsersTempRepository.create(userTemp)
  })
})
