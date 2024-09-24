import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { BodyMeasurementFactory } from 'test/factories/make-body-measurement'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Body Measurement (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let bodyMeasurementFactory: BodyMeasurementFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BodyMeasurementFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    bodyMeasurementFactory = moduleRef.get(BodyMeasurementFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /body-measurement - should return the body measurement of the authenticated user', async () => {
    const user = await userFactory.makePrismaUser()
    await bodyMeasurementFactory.makePrismaBodyMeasurement({}, user.id)

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/body-measurement')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.bodyMeasurement.id).toBe(user.id.toString())
  })

  test('[GET] /body-measurement - should return 400 if body measurement not found', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/body-measurement')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /body-measurement - should return 400 if user not found', async () => {
    const accessToken = jwt.sign({ sub: randomUUID() })

    const response = await request(app.getHttpServer())
      .get('/body-measurement')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })
})
