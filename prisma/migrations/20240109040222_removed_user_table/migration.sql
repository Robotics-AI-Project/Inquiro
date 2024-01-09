/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_user_id_fkey";

-- DropForeignKey
ALTER TABLE "datasource" DROP CONSTRAINT "datasource_user_id_fkey";

-- DropTable
DROP TABLE "user";
