/*
  Warnings:

  - You are about to drop the column `accountId` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `accountId`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `SaleType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
