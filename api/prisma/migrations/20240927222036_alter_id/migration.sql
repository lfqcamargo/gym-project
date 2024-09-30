/*
  Warnings:

  - The primary key for the `exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `exercises_x_muscle_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `exercises_x_muscle_groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `muscle_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `muscle_groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `exercise_id` on the `exercises_x_muscle_groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `muscle_group_id` on the `exercises_x_muscle_groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "exercises_x_muscle_groups" DROP CONSTRAINT "exercises_x_muscle_groups_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "exercises_x_muscle_groups" DROP CONSTRAINT "exercises_x_muscle_groups_muscle_group_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "exercises_x_muscle_groups" DROP CONSTRAINT "exercises_x_muscle_groups_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "exercise_id",
ADD COLUMN     "exercise_id" INTEGER NOT NULL,
DROP COLUMN "muscle_group_id",
ADD COLUMN     "muscle_group_id" INTEGER NOT NULL,
ADD CONSTRAINT "exercises_x_muscle_groups_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "muscle_groups" DROP CONSTRAINT "muscle_groups_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "exercises_x_muscle_groups" ADD CONSTRAINT "exercises_x_muscle_groups_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises_x_muscle_groups" ADD CONSTRAINT "exercises_x_muscle_groups_muscle_group_id_fkey" FOREIGN KEY ("muscle_group_id") REFERENCES "muscle_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
