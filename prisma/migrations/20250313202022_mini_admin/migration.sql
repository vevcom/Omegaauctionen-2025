-- AlterTable
ALTER TABLE "AuksjonsObjekt" ALTER COLUMN "finalSaleTime" SET DEFAULT TIMESTAMP '2025-03-21 01:00:00',
ALTER COLUMN "currentSaleTime" SET DEFAULT TIMESTAMP '2025-03-20 23:00:00';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isMiniAdmin" BOOLEAN NOT NULL DEFAULT false;
