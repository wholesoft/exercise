/*
  Warnings:

  - You are about to alter the column `weight` on the `WorkoutSets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `WorkoutSets` ADD COLUMN `weight_units` VARCHAR(20) NULL,
    MODIFY `weight` DOUBLE NULL;
