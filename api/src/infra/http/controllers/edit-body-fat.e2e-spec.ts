import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit Body Fat (E2E)', () => {
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

  test('[PUT] /body-fat', async () => {
    const user = await userFactory.makePrismaUser()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put('/body-fat')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        subscapular: 10,
        triceps: 12,
        biceps: 11,
        chest: 13,
        midAxillary: 14,
        suprailiac: 15,
        abdominal: 16,
        medialThigh: 17,
        medialCalf: 18,
      })

    expect(response.statusCode).toBe(200)

    const bodyFatOnDatabase = await prisma.bodyFat.findUnique({
      where: {
        id: user.id.toString(),
      },
    })

    expect(bodyFatOnDatabase).toBeTruthy()
    expect(bodyFatOnDatabase?.subscapular).toBe(10)
    expect(bodyFatOnDatabase?.triceps).toBe(12)
    expect(bodyFatOnDatabase?.biceps).toBe(11)
    expect(bodyFatOnDatabase?.chest).toBe(13)
    expect(bodyFatOnDatabase?.midAxillary).toBe(14)
    expect(bodyFatOnDatabase?.suprailiac).toBe(15)
    expect(bodyFatOnDatabase?.abdominal).toBe(16)
    expect(bodyFatOnDatabase?.medialThigh).toBe(17)
    expect(bodyFatOnDatabase?.medialCalf).toBe(18)
  })
})
