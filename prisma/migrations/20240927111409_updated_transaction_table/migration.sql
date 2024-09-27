/*
  Warnings:

  - You are about to alter the column `typeId` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `typeId` INTEGER NOT NULL;
