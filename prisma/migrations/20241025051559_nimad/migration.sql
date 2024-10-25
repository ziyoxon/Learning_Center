/*
  Warnings:

  - You are about to drop the `staff_role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "staff_role" DROP CONSTRAINT "staff_role_staffId_fkey";

-- DropTable
DROP TABLE "staff_role";
