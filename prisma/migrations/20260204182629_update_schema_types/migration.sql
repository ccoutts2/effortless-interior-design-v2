/*
  Warnings:

  - The primary key for the `OrdersOnSchemes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Scheme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SchemesInBasket` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_schemeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrdersOnSchemes" DROP CONSTRAINT "OrdersOnSchemes_schemeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SchemesInBasket" DROP CONSTRAINT "SchemesInBasket_schemeId_fkey";

-- AlterTable
ALTER TABLE "public"."Image" ALTER COLUMN "schemeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."OrdersOnSchemes" DROP CONSTRAINT "OrdersOnSchemes_pkey",
ALTER COLUMN "schemeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrdersOnSchemes_pkey" PRIMARY KEY ("schemeId", "orderId");

-- AlterTable
ALTER TABLE "public"."Scheme" DROP CONSTRAINT "Scheme_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Scheme_id_seq";

-- AlterTable
ALTER TABLE "public"."SchemesInBasket" DROP CONSTRAINT "SchemesInBasket_pkey",
ALTER COLUMN "schemeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SchemesInBasket_pkey" PRIMARY KEY ("schemeId", "basketId");

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnSchemes" ADD CONSTRAINT "OrdersOnSchemes_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SchemesInBasket" ADD CONSTRAINT "SchemesInBasket_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
