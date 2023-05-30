-- DropIndex
DROP INDEX `Exercise_name_key` ON `Exercise`;

-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN `inactive` BOOLEAN NULL DEFAULT false;
