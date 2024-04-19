-- CreateEnum
CREATE TYPE "chat_state_enum" AS ENUM ('IDLE', 'NEED_CLARIFICATION');

-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "chat_state" "chat_state_enum" NOT NULL DEFAULT 'IDLE';
