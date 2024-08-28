-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_cell_id_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "cell_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_cell_id_fkey" FOREIGN KEY ("cell_id") REFERENCES "Cell"("cell_id") ON DELETE SET NULL ON UPDATE CASCADE;
