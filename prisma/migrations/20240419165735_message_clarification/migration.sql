-- CreateEnum
CREATE TYPE "clarification_enum" AS ENUM ('MANUAL', 'OPTION');

-- CreateTable
CREATE TABLE "prompt_clarification" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clarification_type" "clarification_enum" NOT NULL,
    "options" JSONB,

    CONSTRAINT "prompt_clarification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prompt_clarification" ADD CONSTRAINT "prompt_clarification_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
