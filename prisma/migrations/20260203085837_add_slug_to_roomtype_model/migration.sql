/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `RoomType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RoomType" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomType_slug_key" ON "public"."RoomType"("slug");
