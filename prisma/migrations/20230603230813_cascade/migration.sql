-- DropForeignKey
ALTER TABLE `WorkoutExercise` DROP FOREIGN KEY `WorkoutExercise_workout_id_fkey`;

-- DropForeignKey
ALTER TABLE `WorkoutSets` DROP FOREIGN KEY `WorkoutSets_we_id_fkey`;

-- AddForeignKey
ALTER TABLE `WorkoutExercise` ADD CONSTRAINT `WorkoutExercise_workout_id_fkey` FOREIGN KEY (`workout_id`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutSets` ADD CONSTRAINT `WorkoutSets_we_id_fkey` FOREIGN KEY (`we_id`) REFERENCES `WorkoutExercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
