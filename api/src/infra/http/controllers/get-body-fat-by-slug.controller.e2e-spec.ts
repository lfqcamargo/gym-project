import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { BodyFatFactory } from 'test/factories/make-body-fat'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Body Fat By Slug (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let bodyFatFactory: BodyFatFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, BodyFatFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    bodyFatFactory = moduleRef.get(BodyFatFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /body-fat/:slug - should return the body fat for the given user slug', async () => {
    const user = await userFactory.makePrismaUser()
    await bodyFatFactory.makePrismaBodyFat({}, user.id)

    const response = await request(app.getHttpServer())
      .get(`/body-fat/${user.slug.value}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.bodyfat.id).toBe(user.id.toString())
  })

  test('[GET] /body-fat/:slug - should return 400 if user not found', async () => {
    const nonExistingSlug = 'non-existing-slug'

    const response = await request(app.getHttpServer())
      .get(`/body-fat/${nonExistingSlug}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /body-fat/:slug - should return 400 if body fat not found', async () => {
    const user = await userFactory.makePrismaUser()

    const response = await request(app.getHttpServer())
      .get(`/body-fat/${user.slug.value}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })
})
