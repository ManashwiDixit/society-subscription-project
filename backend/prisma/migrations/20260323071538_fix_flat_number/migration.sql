/*
  Warnings:

  - You are about to drop the column `flat` on the `Flat` table. All the data in the column will be lost.
  - Added the required column `flatNumber` to the `Flat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flat" DROP COLUMN "flat",
ADD COLUMN     "flatNumber" TEXT NOT NULL;
