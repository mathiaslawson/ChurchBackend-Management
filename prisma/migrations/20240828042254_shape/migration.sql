/*
  Warnings:

  - You are about to drop the column `surname` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "surname",
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
