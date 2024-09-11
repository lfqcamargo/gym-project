-- CreateTable
CREATE TABLE "profiles" (
    "userid" TEXT NOT NULL,
    "description" TEXT,
    "profile_photo" BYTEA,
    "cover_photo" BYTEA,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userid")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
