/*
  Warnings:

  - You are about to drop the `dashboard_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dashboard_type` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `agent` on the `message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "agent_enum" AS ENUM ('CHATBOT', 'USER');

-- DropForeignKey
ALTER TABLE "dashboard_content" DROP CONSTRAINT "dashboard_content_dashboard_id_fkey";

-- DropForeignKey
ALTER TABLE "dashboard_type" DROP CONSTRAINT "dashboard_type_dashboard_id_fkey";

-- AlterTable
ALTER TABLE "dashboard" ADD COLUMN     "content" JSONB,
ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "message" DROP COLUMN "agent",
ADD COLUMN     "agent" "agent_enum" NOT NULL;

-- DropTable
DROP TABLE "dashboard_content";

-- DropTable
DROP TABLE "dashboard_type";

-- DropEnum
DROP TYPE "Agent";

-- DropEnum
DROP TYPE "DasbaordType";

-- AddForeignKey
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "dashboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
