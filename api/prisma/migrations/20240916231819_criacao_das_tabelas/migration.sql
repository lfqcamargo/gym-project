-- CreateTable
CREATE TABLE "users_temp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "token_expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_temp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "profile_photo" BYTEA,
    "cover_photo" BYTEA,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_measurements" (
    "id" TEXT NOT NULL,
    "left_relaxed_arm" DOUBLE PRECISION NOT NULL,
    "right_relaxed_arm" DOUBLE PRECISION NOT NULL,
    "left_contracted_arm" DOUBLE PRECISION NOT NULL,
    "right_contracted_arm" DOUBLE PRECISION NOT NULL,
    "left_forearm" DOUBLE PRECISION NOT NULL,
    "right_forearm" DOUBLE PRECISION NOT NULL,
    "left_thigh" DOUBLE PRECISION NOT NULL,
    "right_thigh" DOUBLE PRECISION NOT NULL,
    "left_calf" DOUBLE PRECISION NOT NULL,
    "right_calf" DOUBLE PRECISION NOT NULL,
    "relaxed_chest" DOUBLE PRECISION NOT NULL,
    "inspired_chest" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "abdomen" DOUBLE PRECISION NOT NULL,
    "hip" DOUBLE PRECISION NOT NULL,
    "neck" DOUBLE PRECISION NOT NULL,
    "shoulder" DOUBLE PRECISION NOT NULL,
    "upper_skinfolds" DOUBLE PRECISION NOT NULL,
    "lower_skinfolds" DOUBLE PRECISION NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_fat" (
    "id" TEXT NOT NULL,
    "subscapular" DOUBLE PRECISION NOT NULL,
    "triceps" DOUBLE PRECISION NOT NULL,
    "biceps" DOUBLE PRECISION NOT NULL,
    "chest" DOUBLE PRECISION NOT NULL,
    "mid_axillary" DOUBLE PRECISION NOT NULL,
    "suprailiac" DOUBLE PRECISION NOT NULL,
    "abdominal" DOUBLE PRECISION NOT NULL,
    "medial_thigh" DOUBLE PRECISION NOT NULL,
    "medial_calf" DOUBLE PRECISION NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_fat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_temp_email_key" ON "users_temp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_fat" ADD CONSTRAINT "body_fat_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
