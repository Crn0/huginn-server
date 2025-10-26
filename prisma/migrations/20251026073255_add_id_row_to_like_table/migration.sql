/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."Likes" ADD COLUMN     "id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_id_key" ON "public"."Likes"("id");
