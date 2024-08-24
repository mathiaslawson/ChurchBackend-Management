-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ZONE_LEADER', 'FELLOWSHIP_LEADER', 'CELL_LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "zone_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leader_id" INTEGER NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("zone_id")
);

-- CreateTable
CREATE TABLE "Fellowship" (
    "fellowship_id" SERIAL NOT NULL,
    "zone_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "leader_id" INTEGER NOT NULL,

    CONSTRAINT "Fellowship_pkey" PRIMARY KEY ("fellowship_id")
);

-- CreateTable
CREATE TABLE "Cell" (
    "cell_id" SERIAL NOT NULL,
    "fellowship_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "leader_id" INTEGER NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("cell_id")
);

-- CreateTable
CREATE TABLE "Member" (
    "member_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cell_id" INTEGER NOT NULL,
    "surname" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "occupation" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "WeeklyReport" (
    "report_id" SERIAL NOT NULL,
    "cell_id" INTEGER NOT NULL,
    "attendance" INTEGER NOT NULL,
    "new_members" INTEGER NOT NULL,
    "evangelism_report" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("report_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_name_key" ON "Zone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Member_user_id_key" ON "Member"("user_id");

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "Zone"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
