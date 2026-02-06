/*
  Warnings:

  - You are about to drop the column `deafultPrice` on the `Scheme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Scheme" DROP COLUMN "deafultPrice",
ADD COLUMN     "defaultPrice" TEXT;
