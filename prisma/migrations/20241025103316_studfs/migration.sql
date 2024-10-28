/*
  Warnings:

  - Changed the type of `lesson_number` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lesson_number",
ADD COLUMN     "lesson_number" INTEGER NOT NULL;
