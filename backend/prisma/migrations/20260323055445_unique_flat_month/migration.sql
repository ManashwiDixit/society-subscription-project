/*
  Warnings:

  - A unique constraint covering the columns `[flatId,month]` on the table `MonthlyRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonthlyRecord_flatId_month_key" ON "MonthlyRecord"("flatId", "month");
