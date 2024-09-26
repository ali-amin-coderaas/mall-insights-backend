-- AlterTable
ALTER TABLE `account` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `accounttype` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `action` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `shop` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `businessName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `shopindustry` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
