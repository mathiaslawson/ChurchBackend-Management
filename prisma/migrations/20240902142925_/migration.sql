-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ZONE_LEADER', 'FELLOWSHIP_LEADER', 'CELL_LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "lastname" TEXT NOT NULL,
    "gender" "Gender",
    "username" TEXT,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "zone_id" TEXT NOT NULL,
    "zone_name" TEXT NOT NULL,
    "zone_leader_id" TEXT NOT NULL,
    "zone_location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("zone_id")
);

-- CreateTable
CREATE TABLE "Fellowship" (
    "fellowship_id" TEXT NOT NULL,
    "zone_id" TEXT NOT NULL,
    "fellowship_name" TEXT NOT NULL,
    "fellowship_leader_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fellowship_pkey" PRIMARY KEY ("fellowship_id")
);

-- CreateTable
CREATE TABLE "Cell" (
    "cell_id" TEXT NOT NULL,
    "fellowship_id" TEXT NOT NULL,
    "cell_name" TEXT NOT NULL,
    "cell_leader_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("cell_id")
);

-- CreateTable
CREATE TABLE "Member" (
    "member_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cell_id" TEXT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender",
    "role" "UserRole" NOT NULL,
    "birth_date" TIMESTAMP(3),
    "occupation" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "WeeklyReport" (
    "report_id" TEXT NOT NULL,
    "cell_id" TEXT NOT NULL,
    "attendance" TEXT NOT NULL,
    "new_members" TEXT NOT NULL,
    "evangelism_report" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("report_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_zone_name_key" ON "Zone"("zone_name");

-- CreateIndex
CREATE UNIQUE INDEX "Fellowship_fellowship_name_key" ON "Fellowship"("fellowship_name");

-- CreateIndex
CREATE UNIQUE INDEX "Cell_cell_name_key" ON "Cell"("cell_name");

-- CreateIndex
CREATE UNIQUE INDEX "Member_user_id_key" ON "Member"("user_id");

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_zone_leader_id_fkey" FOREIGN KEY ("zone_leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "Zone"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_fellowship_leader_id_fkey" FOREIGN KEY ("fellowship_leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_fellowship_id_fkey" FOREIGN KEY ("fellowship_id") REFERENCES "Fellowship"("fellowship_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_cell_leader_id_fkey" FOREIGN KEY ("cell_leader_id") REFERENCES "Member"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "Cell"("cell_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyReport" ADD CONSTRAINT "WeeklyReport_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "Cell"("cell_id") ON DELETE RESTRICT ON UPDATE CASCADE;
