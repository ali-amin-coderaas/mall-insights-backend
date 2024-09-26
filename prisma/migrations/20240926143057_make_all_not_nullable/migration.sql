/*
  Warnings:

  - Made the column `name` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `accounttype` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `permission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `action` on table `permission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `businessName` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `shopindustry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `accounttype` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `action` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shop` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `businessName` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shopindustry` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;
