/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `authUserId` CHAR(36) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_authUserId_key` ON `User`(`authUserId`);
