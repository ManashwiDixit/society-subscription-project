/*
  Warnings:

  - You are about to drop the column `flat` on the `MonthlyRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlyRecord" DROP COLUMN "flat";

-- AddForeignKey
ALTER TABLE "MonthlyRecord" ADD CONSTRAINT "MonthlyRecord_flatId_fkey" FOREIGN KEY ("flatId") REFERENCES "Flat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
