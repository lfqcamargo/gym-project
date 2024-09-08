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

-- CreateIndex
CREATE UNIQUE INDEX "users_temp_email_key" ON "users_temp"("email");
