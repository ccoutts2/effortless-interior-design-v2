/*
  Warnings:

  - The values [RECURRING,ONE_TIME] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentType_new" AS ENUM ('one_time', 'recurring');
ALTER TABLE "public"."SchemePrice" ALTER COLUMN "type" TYPE "public"."PaymentType_new" USING ("type"::text::"public"."PaymentType_new");
ALTER TYPE "public"."PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "public"."PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "public"."PaymentType_old";
COMMIT;
