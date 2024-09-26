-- CreateTable
CREATE TABLE `Shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `business_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `industry_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop_Industries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_industry_id_fkey` FOREIGN KEY (`industry_id`) REFERENCES `Shop_Industries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
