/*
  Warnings:

  - You are about to drop the column `stripePriceId` on the `Scheme` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_roomTypeName_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_schemeId_fkey";

-- AlterTable
ALTER TABLE "public"."Scheme" DROP COLUMN "stripePriceId",
ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "public"."Image";
