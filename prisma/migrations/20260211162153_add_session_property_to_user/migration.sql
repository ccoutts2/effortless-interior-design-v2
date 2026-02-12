-- DropForeignKey
ALTER TABLE "public"."OrdersOnProducts" DROP CONSTRAINT "OrdersOnProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrdersOnProducts" DROP CONSTRAINT "OrdersOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductsInBasket" DROP CONSTRAINT "ProductsInBasket_basketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductsInBasket" DROP CONSTRAINT "ProductsInBasket_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnProducts" ADD CONSTRAINT "OrdersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnProducts" ADD CONSTRAINT "OrdersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductsInBasket" ADD CONSTRAINT "ProductsInBasket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductsInBasket" ADD CONSTRAINT "ProductsInBasket_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
