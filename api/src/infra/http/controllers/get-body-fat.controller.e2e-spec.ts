import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { BodyFatFactory } from 'test/factories/make-body-fat'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Body Fat (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let bodyFatFactory: BodyFatFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BodyFatFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    bodyFatFactory = moduleRef.get(BodyFatFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /body-fat - should return the body fat of the authenticated user', async () => {
    const user = await userFactory.makePrismaUser()
    await bodyFatFactory.makePrismaBodyFat({}, user.id)

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/body-fat')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.bodyFat.id).toBe(user.id.toString())
  })

  test('[GET] /body-fat - should return 400 if body fat not found', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/body-fat')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /body-fat - should return 400 if user not found', async () => {
    const accessToken = jwt.sign({ sub: randomUUID() })

    const response = await request(app.getHttpServer())
      .get('/body-fat')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })
})
