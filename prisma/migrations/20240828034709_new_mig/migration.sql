/*
  Warnings:

  - You are about to drop the column `first_name` on the `Member` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "first_name",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
