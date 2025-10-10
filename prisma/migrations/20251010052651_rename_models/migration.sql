/*
  Warnings:

  - You are about to drop the `Providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_user_profile_avatar_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_user_profile_banner_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserOIDCAccounts" DROP CONSTRAINT "UserOIDCAccounts_provider_pk_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_userPk_fkey";

-- DropTable
DROP TABLE "public"."Providers";

-- DropTable
DROP TABLE "public"."UserProfile";

-- CreateTable
CREATE TABLE "public"."AuthProviders" (
    "primary_key" INT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "key" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "AuthProviders_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."UserProfiles" (
    "primary_key" INT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "display_name" VARCHAR,
    "bio" VARCHAR,
    "location" VARCHAR,
    "birthday" DATE,
    "website" VARCHAR,
    "userPk" INTEGER NOT NULL,

    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("primary_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthProviders_id_key" ON "public"."AuthProviders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthProviders_key_key" ON "public"."AuthProviders"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_id_key" ON "public"."UserProfiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_userPk_key" ON "public"."UserProfiles"("userPk");

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_user_profile_avatar_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfiles"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_user_profile_banner_pk_fkey" FOREIGN KEY ("user_profile_avatar_pk") REFERENCES "public"."UserProfiles"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProfiles" ADD CONSTRAINT "UserProfiles_userPk_fkey" FOREIGN KEY ("userPk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserOIDCAccounts" ADD CONSTRAINT "UserOIDCAccounts_provider_pk_fkey" FOREIGN KEY ("provider_pk") REFERENCES "public"."AuthProviders"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
