import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { ExerciseFactory } from 'test/factories/make-exercise'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Exercise (E2E)', () => {
  let app: INestApplication
  let exerciseFactory: ExerciseFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ExerciseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    exerciseFactory = moduleRef.get(ExerciseFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /exercises/:id - should return the exercise information', async () => {
    const exercise = await exerciseFactory.makePrismaExercise()

    const response = await request(app.getHttpServer())
      .get(`/exercises/${exercise.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.exercise.id).toBe(exercise.id)
    expect(response.body.exercise.name).toBe(exercise.name)
  })

  test('[GET] /exercises/:id - should return 400 if exercise not found', async () => {
    const accessToken = jwt.sign({ sub: randomUUID() })

    const response = await request(app.getHttpServer())
      .get(`/exercises/99999`) // ID inexistente
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /exercises/:id - should return 400 for invalid ID format', async () => {
    const response = await request(app.getHttpServer())
      .get(`/exercises/invalid-id`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('Validation failed')
  })
})
