/*
  Warnings:

  - You are about to drop the column `next_scheduled` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Workout` DROP COLUMN `next_scheduled`,
    ADD COLUMN `scheduled` BOOLEAN NULL;
