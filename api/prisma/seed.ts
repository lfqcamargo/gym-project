import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Populando os MuscleGroups (Grupos Musculares)
  const peitoral = await prisma.muscleGroup.create({
    data: {
      description: 'Peitoral',
    },
  })

  const biceps = await prisma.muscleGroup.create({
    data: {
      description: 'Bíceps',
    },
  })

  const triceps = await prisma.muscleGroup.create({
    data: {
      description: 'Tríceps',
    },
  })

  // Populando os Exercícios
  const supino = await prisma.exercise.create({
    data: {
      name: 'Supino Reto',
      description: 'Exercício para o desenvolvimento do peitoral.',
    },
  })

  const roscaDireta = await prisma.exercise.create({
    data: {
      name: 'Rosca Direta',
      description: 'Exercício para o desenvolvimento dos bíceps.',
    },
  })

  const pulley = await prisma.exercise.create({
    data: {
      name: 'Pulley',
      description: 'Exercício para o desenvolvimento dos tríceps.',
    },
  })

  // Relacionando Exercícios com Grupos Musculares (Tabela de junção ExerciseMuscleGroups)
  await prisma.exerciseMuscleGroups.createMany({
    data: [
      {
        exerciseId: supino.id,
        muscleGroupId: peitoral.id,
        muscleActivation: 1,
      },
      {
        exerciseId: roscaDireta.id,
        muscleGroupId: biceps.id,
        muscleActivation: 1,
      },
      {
        exerciseId: pulley.id,
        muscleGroupId: triceps.id,
        muscleActivation: 1,
      },
    ],
  })

  console.log('Banco de dados populado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
