/*
  Warnings:

  - You are about to drop the column `flatNumber` on the `Flat` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Flat` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Flat` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Flat` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `MonthlyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `flatId` on the `MonthlyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `flatId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveFrom` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `flatType` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyAmount` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `Flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flat` to the `Flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Flat` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Flat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `flat` to the `MonthlyRecord` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `MonthlyRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `flat` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `amount` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Flat" DROP CONSTRAINT "Flat_userId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyRecord" DROP CONSTRAINT "MonthlyRecord_flatId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_flatId_fkey";

-- DropIndex
DROP INDEX "Flat_userId_key";

-- DropIndex
DROP INDEX "MonthlyRecord_flatId_month_key";

-- DropIndex
DROP INDEX "Payment_flatId_month_key";

-- AlterTable
ALTER TABLE "Flat" DROP COLUMN "flatNumber",
DROP COLUMN "isActive",
DROP COLUMN "ownerName",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "flat" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MonthlyRecord" DROP COLUMN "createdAt",
DROP COLUMN "flatId",
ADD COLUMN     "flat" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "flatId",
DROP COLUMN "method",
DROP COLUMN "paidAt",
DROP COLUMN "transactionId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "flat" TEXT NOT NULL,
ADD COLUMN     "mode" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "effectiveFrom",
DROP COLUMN "flatType",
DROP COLUMN "monthlyAmount",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FlatType";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";
