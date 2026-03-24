/*
  Warnings:

  - Added the required column `flatId` to the `MonthlyRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyRecord" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "flatId" TEXT NOT NULL;
