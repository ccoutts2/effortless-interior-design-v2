/*
  Warnings:

  - You are about to drop the `OrdersOnSchemes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scheme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchemePrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchemesInBasket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OrdersOnSchemes" DROP CONSTRAINT "OrdersOnSchemes_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrdersOnSchemes" DROP CONSTRAINT "OrdersOnSchemes_schemeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Scheme" DROP CONSTRAINT "Scheme_roomTypeName_fkey";

-- DropForeignKey
ALTER TABLE "public"."SchemePrice" DROP CONSTRAINT "SchemePrice_schemeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SchemesInBasket" DROP CONSTRAINT "SchemesInBasket_basketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SchemesInBasket" DROP CONSTRAINT "SchemesInBasket_schemeId_fkey";

-- DropTable
DROP TABLE "public"."OrdersOnSchemes";

-- DropTable
DROP TABLE "public"."Scheme";

-- DropTable
DROP TABLE "public"."SchemePrice";

-- DropTable
DROP TABLE "public"."SchemesInBasket";

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isScheme" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "images" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomTypeName" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductPrice" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL,
    "type" "public"."PaymentType",
    "unitAmount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrdersOnProducts" (
    "productId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrdersOnProducts_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateTable
CREATE TABLE "public"."ProductsInBasket" (
    "productId" TEXT NOT NULL,
    "basketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductsInBasket_pkey" PRIMARY KEY ("productId","basketId")
);

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_roomTypeName_fkey" FOREIGN KEY ("roomTypeName") REFERENCES "public"."RoomType"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductPrice" ADD CONSTRAINT "ProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnProducts" ADD CONSTRAINT "OrdersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnProducts" ADD CONSTRAINT "OrdersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductsInBasket" ADD CONSTRAINT "ProductsInBasket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductsInBasket" ADD CONSTRAINT "ProductsInBasket_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
