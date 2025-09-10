-- CreateTable
CREATE TABLE "public"."Scheme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "roomTypeName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "schemeId" INTEGER NOT NULL,
    "schemeIndex" INTEGER NOT NULL,
    "roomTypeName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoomType" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "newsletterSub" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "withConsultation" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrdersOnSchemes" (
    "schemeId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrdersOnSchemes_pkey" PRIMARY KEY ("schemeId","orderId")
);

-- AddForeignKey
ALTER TABLE "public"."Scheme" ADD CONSTRAINT "Scheme_roomTypeName_fkey" FOREIGN KEY ("roomTypeName") REFERENCES "public"."RoomType"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_roomTypeName_fkey" FOREIGN KEY ("roomTypeName") REFERENCES "public"."RoomType"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnSchemes" ADD CONSTRAINT "OrdersOnSchemes_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "public"."Scheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdersOnSchemes" ADD CONSTRAINT "OrdersOnSchemes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
