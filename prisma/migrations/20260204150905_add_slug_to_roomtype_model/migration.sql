/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Scheme` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Scheme` table. All the data in the column will be lost.
  - You are about to drop the column `roomTypeNameSlug` on the `Scheme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Scheme" DROP COLUMN "isAvailable",
DROP COLUMN "price",
DROP COLUMN "roomTypeNameSlug",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "stripePriceId" TEXT;
