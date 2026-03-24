-- AlterTable
ALTER TABLE "MonthlyRecord" ADD COLUMN     "amountPaid" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amountPaid" INTEGER NOT NULL DEFAULT 0;
