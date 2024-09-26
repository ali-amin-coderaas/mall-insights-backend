-- AlterTable
ALTER TABLE `users` ALTER COLUMN `role_id` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
