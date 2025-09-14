/*
  Warnings:

  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar_media_pk` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `banner_media_pk` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to alter the column `primary_key` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_avatar_media_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_banner_media_pk_fkey";

-- DropIndex
DROP INDEX "public"."UserProfile_avatar_media_pk_key";

-- DropIndex
DROP INDEX "public"."UserProfile_banner_media_pk_key";

-- AlterTable
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "avatar_media_pk",
DROP COLUMN "banner_media_pk",
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("primary_key");

-- DropTable
DROP TABLE "public"."Media";

-- CreateTable
CREATE TABLE "public"."Medias" (
    "primary_key" INT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "file_path" VARCHAR NOT NULL,
    "bytes" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,
    "user_profile_avatar_pk" INTEGER,
    "user_profile_banner_pk" INTEGER,

    CONSTRAINT "Medias_pkey" PRIMARY KEY ("primary_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medias_id_key" ON "public"."Medias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Medias_user_profile_avatar_pk_key" ON "public"."Medias"("user_profile_avatar_pk");

-- CreateIndex
CREATE UNIQUE INDEX "Medias_user_profile_banner_pk_key" ON "public"."Medias"("user_profile_banner_pk");

-- AddForeignKey
ALTER TABLE "public"."Medias" ADD CONSTRAINT "Media_user_profile_avatar_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfile"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medias" ADD CONSTRAINT "Media_user_profile_banner_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfile"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
