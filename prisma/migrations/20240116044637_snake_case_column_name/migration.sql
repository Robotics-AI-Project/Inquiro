/*
  Warnings:

  - You are about to drop the column `createdAt` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `datasource` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `datasource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "datasource" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
