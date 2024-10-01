import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { MuscleGroupFactory } from 'test/factories/make-muscle-group'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Muscle Group (E2E)', () => {
  let app: INestApplication
  let muscleGroupFactory: MuscleGroupFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MuscleGroupFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    muscleGroupFactory = moduleRef.get(MuscleGroupFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /muscle-groups/:id - should return the muscle group information', async () => {
    const muscleGroup = await muscleGroupFactory.makePrismaMuscleGroup()

    const response = await request(app.getHttpServer())
      .get(`/muscle-groups/${muscleGroup.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.muscleGroup.id).toBe(muscleGroup.id)
    expect(response.body.muscleGroup.description).toBe(muscleGroup.description)
  })

  test('[GET] /muscle-groups/:id - should return 400 if muscle group not found', async () => {
    const accessToken = jwt.sign({ sub: randomUUID() })

    const response = await request(app.getHttpServer())
      .get(`/muscle-groups/99999`) // ID inexistente
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /muscle-groups/:id - should return 400 for invalid ID format', async () => {
    const response = await request(app.getHttpServer())
      .get(`/muscle-groups/invalid-id`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('Validation failed')
  })
})
