import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { BodyMeasurementFactory } from 'test/factories/make-body-measurement'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Body Measurement By Slug (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let bodyMeasurementFactory: BodyMeasurementFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BodyMeasurementFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    bodyMeasurementFactory = moduleRef.get(BodyMeasurementFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /body-measurement/:slug - should return the body measurement for the given user slug', async () => {
    const user = await userFactory.makePrismaUser()
    await bodyMeasurementFactory.makePrismaBodyMeasurement({}, user.id)

    const response = await request(app.getHttpServer())
      .get(`/body-measurement/${user.slug.value}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.bodymeasurement.id).toBe(user.id.toString())
  })

  test('[GET] /body-measurement/:slug - should return 400 if user not found', async () => {
    const nonExistingSlug = 'non-existing-slug'

    const response = await request(app.getHttpServer())
      .get(`/body-measurement/${nonExistingSlug}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /body-measurement/:slug - should return 400 if body measurement not found', async () => {
    const user = await userFactory.makePrismaUser()

    const response = await request(app.getHttpServer())
      .get(`/body-measurement/${user.slug.value}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })
})
