-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "secretHash" BYTEA NOT NULL,
    "lastVerifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
