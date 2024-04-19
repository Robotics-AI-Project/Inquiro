/*
  Warnings:

  - You are about to drop the column `chat_state` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "chat_state";

-- DropEnum
DROP TYPE "chat_state_enum";
