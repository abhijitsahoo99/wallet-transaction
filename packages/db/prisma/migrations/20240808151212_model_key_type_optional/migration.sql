-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
