/*
  Warnings:

  - A unique constraint covering the columns `[clarification_id]` on the table `message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[message_id]` on the table `prompt_clarification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "prompt_clarification" DROP CONSTRAINT "prompt_clarification_message_id_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "clarification_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "message_clarification_id_key" ON "message"("clarification_id");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_clarification_message_id_key" ON "prompt_clarification"("message_id");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_clarification_id_fkey" FOREIGN KEY ("clarification_id") REFERENCES "prompt_clarification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
