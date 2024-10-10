import { randomInt, randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const password =
    '$2a$08$iT4qt7CE.Pafz5LCTMHNeeRrPqNWWUtw0Ote0fuawXzXLKGMXru5W'

  await prisma.user.create({
    data: {
      id: 'f4329268-9f14-4a9e-88fa-c23f60b7ffaf',
      email: `lfqcamargo@gmail.com`,
      name: `Lucas Camargo`,
      password,
      slug: `lfqcamargo`,
      lastLogin: new Date(),
    },
  })

  for (let i = 1; i < 11; i++) {
    const id = randomUUID()
    const name = faker.person.fullName()
    const slug = name.replace(/\s+/g, '')

    await prisma.user.create({
      data: {
        id,
        email: `user${i}@gmail.com`,
        name,
        password,
        slug,
        lastLogin: new Date(),
      },
    })

    await prisma.profile.create({
      data: {
        id,
        description: name,
      },
    })

    await prisma.bodyMeasurement.create({
      data: {
        id,
        leftRelaxedArm: faker.number.float(),
        rightRelaxedArm: faker.number.float(),
        leftContractedArm: faker.number.float(),
        rightContractedArm: faker.number.float(),
        leftForearm: faker.number.float(),
        rightForearm: faker.number.float(),
        leftThigh: faker.number.float(),
        rightThigh: faker.number.float(),
        leftCalf: faker.number.float(),
        rightCalf: faker.number.float(),
        relaxedChest: faker.number.float(),
        inspiredChest: faker.number.float(),
        waist: faker.number.float(),
        abdomen: faker.number.float(),
        hip: faker.number.float(),
        neck: faker.number.float(),
        shoulder: faker.number.float(),
        upperSkinfolds: faker.number.float(),
        lowerSkinfolds: faker.number.float(),
        updatedDate: faker.date.past(),
      },
    })

    await prisma.bodyFat.create({
      data: {
        id,
        subscapular: faker.number.float(),
        triceps: faker.number.float(),
        biceps: faker.number.float(),
        chest: faker.number.float(),
        midAxillary: faker.number.float(),
        suprailiac: faker.number.float(),
        abdominal: faker.number.float(),
        medialThigh: faker.number.float(),
        medialCalf: faker.number.float(),
        updatedDate: faker.date.past(),
      },
    })
  }

  console.log('Usuários criados com sucesso!')

  const exercises = [
    'Supino Reto',
    'Supino Inclinado',
    'Supino Declinado',
    'Crossover',
    'Voador/Peck Deck',
    'Rosca Direta',
    'Rosca Martelo',
    'Rosca Concentrada',
    'Tríceps Testa',
    'Tríceps Pulley',
    'Tríceps Coice',
    'Elevação Lateral',
    'Desenvolvimento com Halteres',
    'Desenvolvimento Militar',
    'Puxada Frontal',
    'Remada Curvada',
    'Remada Unilateral',
    'Levantamento Terra',
    'Agachamento Livre',
    'Leg Press 45º',
    'Cadeira Extensora',
    'Cadeira Flexora',
    'Stiff',
    'Panturrilha em Pé',
    'Panturrilha Sentada',
    'Abdominal Supra',
    'Abdominal Infra',
    'Prancha',
    'Elevação de Quadril',
    'Avanço/Passada',
  ]

  const muscleGroups = [
    'Peitoral',
    'Bíceps',
    'Tríceps',
    'Deltóides',
    'Trapézio',
    'Dorsal',
    'Rombóides',
    'Abdômen',
    'Oblíquos',
    'Quadríceps',
    'Posterior de Coxa',
    'Glúteos',
    'Panturrilhas',
    'Antebraços',
    'Adutores',
    'Abdutores',
    'Eretores da Coluna',
  ]

  for (let i = 0; i < exercises.length; i++)
    await prisma.exercise.create({
      data: {
        id: i + 1,
        name: exercises[i],
        description: exercises[i],
      },
    })

  for (let i = 0; i < muscleGroups.length; i++) {
    await prisma.muscleGroup.create({
      data: {
        id: i + 1,
        description: muscleGroups[i],
      },
    })
  }

  const exerciseMuscleRelations = [
    { exercise: 'Supino Reto', muscles: ['Peitoral', 'Tríceps', 'Deltóides'] },
    {
      exercise: 'Supino Inclinado',
      muscles: ['Peitoral', 'Tríceps', 'Deltóides'],
    },
    {
      exercise: 'Supino Declinado',
      muscles: ['Peitoral', 'Tríceps', 'Deltóides'],
    },
    { exercise: 'Crossover', muscles: ['Peitoral'] },
    { exercise: 'Voador/Peck Deck', muscles: ['Peitoral'] },
    { exercise: 'Rosca Direta', muscles: ['Bíceps'] },
    { exercise: 'Rosca Martelo', muscles: ['Bíceps'] },
    { exercise: 'Rosca Concentrada', muscles: ['Bíceps'] },
    { exercise: 'Tríceps Testa', muscles: ['Tríceps'] },
    { exercise: 'Tríceps Pulley', muscles: ['Tríceps'] },
    { exercise: 'Tríceps Coice', muscles: ['Tríceps'] },
    { exercise: 'Elevação Lateral', muscles: ['Deltóides'] },
    { exercise: 'Desenvolvimento com Halteres', muscles: ['Deltóides'] },
    { exercise: 'Desenvolvimento Militar', muscles: ['Deltóides'] },
    {
      exercise: 'Puxada Frontal',
      muscles: ['Dorsal', 'Trapézio', 'Rombóides'],
    },
    {
      exercise: 'Remada Curvada',
      muscles: ['Dorsal', 'Trapézio', 'Rombóides'],
    },
    {
      exercise: 'Remada Unilateral',
      muscles: ['Dorsal', 'Trapézio', 'Rombóides'],
    },
    {
      exercise: 'Levantamento Terra',
      muscles: ['Dorsal', 'Glúteos', 'Quadríceps', 'Posterior de Coxa'],
    },
    {
      exercise: 'Agachamento Livre',
      muscles: ['Quadríceps', 'Glúteos', 'Panturrilhas'],
    },
    {
      exercise: 'Leg Press 45º',
      muscles: ['Quadríceps', 'Glúteos', 'Panturrilhas'],
    },
    { exercise: 'Cadeira Extensora', muscles: ['Quadríceps'] },
    { exercise: 'Cadeira Flexora', muscles: ['Posterior de Coxa'] },
    { exercise: 'Stiff', muscles: ['Posterior de Coxa', 'Glúteos'] },
    { exercise: 'Panturrilha em Pé', muscles: ['Panturrilhas'] },
    { exercise: 'Panturrilha Sentada', muscles: ['Panturrilhas'] },
    { exercise: 'Abdominal Supra', muscles: ['Abdômen'] },
    { exercise: 'Abdominal Infra', muscles: ['Abdômen'] },
    { exercise: 'Prancha', muscles: ['Abdômen', 'Oblíquos'] },
    { exercise: 'Elevação de Quadril', muscles: ['Glúteos'] },
    { exercise: 'Avanço/Passada', muscles: ['Quadríceps', 'Glúteos'] },
  ]

  for (const relation of exerciseMuscleRelations) {
    const exercise = await prisma.exercise.findUnique({
      where: { name: relation.exercise },
    })

    for (const muscle of relation.muscles) {
      const muscleGroup = await prisma.muscleGroup.findUnique({
        where: { description: muscle },
      })

      if (exercise && muscleGroup) {
        await prisma.exerciseMuscleGroups.create({
          data: {
            exerciseId: exercise.id,
            muscleGroupId: muscleGroup.id,
            muscleActivation: randomInt(3),
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
