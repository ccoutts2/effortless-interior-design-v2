-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('RECURRING', 'ONE_TIME');

-- CreateTable
CREATE TABLE "public"."SchemePrice" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL,
    "type" "public"."PaymentType",
    "unitAmount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schemeId" TEXT NOT NULL,

    CONSTRAINT "SchemePrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SchemePrice" ADD CONSTRAINT "SchemePrice_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
