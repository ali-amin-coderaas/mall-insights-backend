/*
  Warnings:

  - You are about to alter the column `isModifiedFrom` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `isModifiedTo` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `isModifiedTo` INTEGER NOT NULL,
    MODIFY `isModifiedFrom` INTEGER NOT NULL;
