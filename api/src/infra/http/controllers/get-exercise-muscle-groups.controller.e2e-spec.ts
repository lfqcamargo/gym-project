import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ExerciseFactory } from 'test/factories/make-exercise'
import { ExerciseMuscleGroupsFactory } from 'test/factories/make-exercise-muscle-groups'
import { MuscleGroupFactory } from 'test/factories/make-muscle-group'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Exercise Muscle Groups (E2E)', () => {
  let app: INestApplication
  let exerciseFactory: ExerciseFactory
  let muscleGroupFactory: MuscleGroupFactory
  let exerciseMuscleGroupsFactory: ExerciseMuscleGroupsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ExerciseFactory,
        MuscleGroupFactory,
        ExerciseMuscleGroupsFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    exerciseFactory = moduleRef.get(ExerciseFactory)
    muscleGroupFactory = moduleRef.get(MuscleGroupFactory)
    exerciseMuscleGroupsFactory = moduleRef.get(ExerciseMuscleGroupsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /exercise-muscle-groups/:id - should return the exercise muscle group information', async () => {
    const exercise = await exerciseFactory.makePrismaExercise()
    const muscleGroup = await muscleGroupFactory.makePrismaMuscleGroup()

    const exerciseMuscleGroups =
      await exerciseMuscleGroupsFactory.makePrismaExerciseMuscleGroups({
        exerciseId: exercise.id,
        muscleGroupId: muscleGroup.id,
      })

    const response = await request(app.getHttpServer())
      .get(`/exercise-muscle-groups/${exerciseMuscleGroups.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.exerciseMuscleGroups.id).toBe(exerciseMuscleGroups.id)
  })

  test('[GET] /exercise-muscle-groups/:id - should return 400 if exercise muscle group not found', async () => {
    const accessToken = jwt.sign({ sub: 'non-existing-id' })

    const response = await request(app.getHttpServer())
      .get(`/exercise-muscle-groups/99999`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Resource not found')
  })

  test('[GET] /exercise-muscle-groups/:id - should return 400 for invalid ID format', async () => {
    const response = await request(app.getHttpServer())
      .get(`/exercise-muscle-groups/invalid-id`)
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('Validation failed')
  })
})
