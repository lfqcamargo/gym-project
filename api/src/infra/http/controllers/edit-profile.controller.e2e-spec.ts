import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit Profile (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PATCH] /profiles', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .patch('/profiles')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('profilePhoto', './test/e2e/sample-upload.png')
      .attach('coverPhoto', './test/e2e/sample-upload.png')
      .field('description', 'New Description')

    console.log(JSON.stringify(response.body, null, 2))
    expect(response.statusCode).toBe(200)

    const profileOnDatabase = await prisma.profile.findUnique({
      where: {
        userId: user.id.toString(),
      },
    })

    expect(profileOnDatabase).toBeTruthy()
  })
})
