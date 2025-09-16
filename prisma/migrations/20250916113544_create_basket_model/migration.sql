-- CreateTable
CREATE TABLE "public"."Basket" (
    "id" SERIAL NOT NULL,
    "items" JSONB NOT NULL DEFAULT '[]',
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Basket_sessionId_key" ON "public"."Basket"("sessionId");

-- AddForeignKey
ALTER TABLE "public"."Basket" ADD CONSTRAINT "Basket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
