-- CreateTable
CREATE TABLE "public"."SchemesInBasket" (
    "schemeId" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemesInBasket_pkey" PRIMARY KEY ("schemeId","basketId")
);

-- AddForeignKey
ALTER TABLE "public"."SchemesInBasket" ADD CONSTRAINT "SchemesInBasket_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SchemesInBasket" ADD CONSTRAINT "SchemesInBasket_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
