import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Email Confirmation (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[Get] /confirmation', async () => {
    await request(app.getHttpServer()).post('/users').send({
      name: 'Lucas Camargo',
      email: 'lfqcamargo@gmail.com',
      password: '123456',
    })

    const userTempOnDatabase = await prisma.userTemp.findUnique({
      where: {
        email: 'lfqcamargo@gmail.com',
      },
    })

    if (!userTempOnDatabase) {
      throw new Error()
    }
    const token = userTempOnDatabase.token

    const response = await request(app.getHttpServer()).get(
      `/confirmation/${token}`,
    )

    expect(response.statusCode).toBe(200)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'lfqcamargo@gmail.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
