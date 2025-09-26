/*
  Warnings:

  - You are about to drop the `Medias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Medias" DROP CONSTRAINT "Media_user_profile_avatar_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."Medias" DROP CONSTRAINT "Media_user_profile_banner_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MediaToTweet" DROP CONSTRAINT "_MediaToTweet_A_fkey";

-- DropTable
DROP TABLE "public"."Medias";

-- CreateTable
CREATE TABLE "public"."Media" (
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

    CONSTRAINT "Media_pkey" PRIMARY KEY ("primary_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "public"."Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_user_profile_avatar_pk_key" ON "public"."Media"("user_profile_avatar_pk");

-- CreateIndex
CREATE UNIQUE INDEX "Media_user_profile_banner_pk_key" ON "public"."Media"("user_profile_banner_pk");

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_user_profile_avatar_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfile"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_user_profile_banner_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfile"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MediaToTweet" ADD CONSTRAINT "_MediaToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Media"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
