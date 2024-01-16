/*
  Warnings:

  - Made the column `name` on table `chat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chat" ALTER COLUMN "name" SET NOT NULL;
