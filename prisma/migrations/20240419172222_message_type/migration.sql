-- CreateEnum
CREATE TYPE "message_enum" AS ENUM ('TEXT', 'SQL');

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "message_type" "message_enum" NOT NULL DEFAULT 'TEXT';
