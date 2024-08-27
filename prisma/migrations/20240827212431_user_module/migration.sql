/*
  Warnings:

  - The primary key for the `Cell` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Fellowship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `leader_id` on the `Fellowship` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Fellowship` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WeeklyReport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `leader_id` on the `Zone` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Zone` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zone_name]` on the table `Zone` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fellowship_leader_id` to the `Fellowship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fellowship_name` to the `Fellowship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Fellowship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Zone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_leader_id` to the `Zone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_leader_location` to the `Zone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_name` to the `Zone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_fellowship_id_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_leader_id_fkey";

-- DropForeignKey
ALTER TABLE "Fellowship" DROP CONSTRAINT "Fellowship_leader_id_fkey";

-- DropForeignKey
ALTER TABLE "Fellowship" DROP CONSTRAINT "Fellowship_zone_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_cell_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_user_id_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyReport" DROP CONSTRAINT "WeeklyReport_cell_id_fkey";

-- DropForeignKey
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_leader_id_fkey";

-- DropIndex
DROP INDEX "Zone_name_key";

-- AlterTable
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "cell_id" DROP DEFAULT,
ALTER COLUMN "cell_id" SET DATA TYPE TEXT,
ALTER COLUMN "fellowship_id" SET DATA TYPE TEXT,
ALTER COLUMN "leader_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cell_pkey" PRIMARY KEY ("cell_id");
DROP SEQUENCE "Cell_cell_id_seq";

-- AlterTable
ALTER TABLE "Fellowship" DROP CONSTRAINT "Fellowship_pkey",
DROP COLUMN "leader_id",
DROP COLUMN "name",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fellowship_leader_id" TEXT NOT NULL,
ADD COLUMN     "fellowship_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fellowship_id" DROP DEFAULT,
ALTER COLUMN "fellowship_id" SET DATA TYPE TEXT,
ALTER COLUMN "zone_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fellowship_pkey" PRIMARY KEY ("fellowship_id");
DROP SEQUENCE "Fellowship_fellowship_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "member_id" DROP DEFAULT,
ALTER COLUMN "member_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "cell_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id");
DROP SEQUENCE "Member_member_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "birth_date" TIMESTAMP(3) NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";


-- AlterTable
ALTER TABLE "WeeklyReport" DROP CONSTRAINT "WeeklyReport_pkey",
ALTER COLUMN "report_id" DROP DEFAULT,
ALTER COLUMN "report_id" SET DATA TYPE TEXT,
ALTER COLUMN "cell_id" SET DATA TYPE TEXT,
ALTER COLUMN "attendance" SET DATA TYPE TEXT,
ALTER COLUMN "new_members" SET DATA TYPE TEXT,
ADD CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("report_id");
DROP SEQUENCE "WeeklyReport_report_id_seq";

-- AlterTable
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_pkey",
DROP COLUMN "leader_id",
DROP COLUMN "name",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "zone_leader_id" TEXT NOT NULL,
ADD COLUMN     "zone_leader_location" TEXT NOT NULL,
ADD COLUMN     "zone_name" TEXT NOT NULL,
ALTER COLUMN "zone_id" DROP DEFAULT,
ALTER COLUMN "zone_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zone_pkey" PRIMARY KEY ("zone_id");
DROP SEQUENCE "Zone_zone_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Zone_zone_name_key" ON "Zone"("zone_name");

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_zone_leader_id_fkey" FOREIGN KEY ("zone_leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "Zone"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_fellowship_leader_id_fkey" FOREIGN KEY ("fellowship_leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_fellowship_id_fkey" FOREIGN KEY ("fellowship_id") REFERENCES "Fellowship"("fellowship_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "Cell"("cell_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyReport" ADD CONSTRAINT "WeeklyReport_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "Cell"("cell_id") ON DELETE RESTRICT ON UPDATE CASCADE;
