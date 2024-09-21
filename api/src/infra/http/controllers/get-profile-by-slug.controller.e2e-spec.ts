import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Profile (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /profiles/:slug - should return the profile slug user', async () => {
    const user = await userFactory.makePrismaUser()

    const response = await request(app.getHttpServer())
      .get(`/profiles/${user.slug.value}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body.profile.id).toBe(user.id.toString())
  })

  test('[GET] /profiles/:slug - should return 400 if profile not found', async () => {
    const accessToken = jwt.sign({ sub: randomUUID() })

    const response = await request(app.getHttpServer())
      .get(`/profiles/non-slug`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    console.log(JSON.stringify(response))

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })
})
