import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit BodyMeasurement (E2E)', () => {
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

  test('[PUT] /body-measurements', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put('/body-measurements')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        leftRelaxedArm: 35,
        rightRelaxedArm: 36,
        leftContractedArm: 40,
        rightContractedArm: 41,
        leftForearm: 30,
        rightForearm: 31,
        leftThigh: 60,
        rightThigh: 61,
        leftCalf: 40,
        rightCalf: 41,
        relaxedChest: 100,
        inspiredChest: 110,
        waist: 90,
        abdomen: 80,
        hip: 100,
        neck: 40,
        shoulder: 50,
        upperSkinfolds: 15,
        lowerSkinfolds: 10,
      })

    expect(response.statusCode).toBe(200)

    const bodyMeasurementOnDatabase = await prisma.bodyMeasurement.findUnique({
      where: {
        id: user.id.toString(),
      },
    })

    console.log(bodyMeasurementOnDatabase)

    expect(bodyMeasurementOnDatabase).toBeTruthy()
    expect(bodyMeasurementOnDatabase?.leftRelaxedArm).toBe(35)
    expect(bodyMeasurementOnDatabase?.rightRelaxedArm).toBe(36)
    expect(bodyMeasurementOnDatabase?.leftContractedArm).toBe(40)
    expect(bodyMeasurementOnDatabase?.rightContractedArm).toBe(41)
    expect(bodyMeasurementOnDatabase?.leftForearm).toBe(30)
    expect(bodyMeasurementOnDatabase?.rightForearm).toBe(31)
    expect(bodyMeasurementOnDatabase?.leftThigh).toBe(60)
    expect(bodyMeasurementOnDatabase?.rightThigh).toBe(61)
    expect(bodyMeasurementOnDatabase?.leftCalf).toBe(40)
    expect(bodyMeasurementOnDatabase?.rightCalf).toBe(41)
    expect(bodyMeasurementOnDatabase?.relaxedChest).toBe(100)
    expect(bodyMeasurementOnDatabase?.inspiredChest).toBe(110)
    expect(bodyMeasurementOnDatabase?.waist).toBe(90)
    expect(bodyMeasurementOnDatabase?.abdomen).toBe(80)
    expect(bodyMeasurementOnDatabase?.hip).toBe(100)
    expect(bodyMeasurementOnDatabase?.neck).toBe(40)
    expect(bodyMeasurementOnDatabase?.shoulder).toBe(50)
    expect(bodyMeasurementOnDatabase?.upperSkinfolds).toBe(15)
    expect(bodyMeasurementOnDatabase?.lowerSkinfolds).toBe(10)
  })
})
