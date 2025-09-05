-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('refresh_token', 'action_token');

-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('image', 'gif', 'video');

-- CreateEnum
CREATE TYPE "public"."AccountLevel" AS ENUM ('demo', 'user', 'admin');

-- CreateTable
CREATE TABLE "public"."Providers" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "key" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."BlacklistedTokens" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "jwt_id" VARCHAR NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "type" "public"."TokenType" NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "BlacklistedTokens_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "file_path" VARCHAR NOT NULL,
    "bytes" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."UserProfile" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "display_name" VARCHAR,
    "bio" VARCHAR,
    "location" VARCHAR,
    "birthday" DATE,
    "website" VARCHAR,
    "avatar_media_pk" INTEGER,
    "banner_media_pk" INTEGER,
    "userPk" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "email" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR,
    "account_level" "public"."AccountLevel" NOT NULL DEFAULT 'demo',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."UserOIDCAccounts" (
    "primary_key" BIGINT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "sub" VARCHAR NOT NULL,
    "access_token" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "provider_pk" INTEGER NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "UserOIDCAccounts_pkey" PRIMARY KEY ("primary_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Providers_id_key" ON "public"."Providers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Providers_key_key" ON "public"."Providers"("key");

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedTokens_id_key" ON "public"."BlacklistedTokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedTokens_jwt_id_key" ON "public"."BlacklistedTokens"("jwt_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "public"."Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_key" ON "public"."UserProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_avatar_media_pk_key" ON "public"."UserProfile"("avatar_media_pk");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_banner_media_pk_key" ON "public"."UserProfile"("banner_media_pk");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userPk_key" ON "public"."UserProfile"("userPk");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "public"."Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "public"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserOIDCAccounts_id_key" ON "public"."UserOIDCAccounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserOIDCAccounts_provider_pk_user_pk_key" ON "public"."UserOIDCAccounts"("provider_pk", "user_pk");

-- CreateIndex
CREATE UNIQUE INDEX "UserOIDCAccounts_provider_pk_sub_key" ON "public"."UserOIDCAccounts"("provider_pk", "sub");

-- AddForeignKey
ALTER TABLE "public"."BlacklistedTokens" ADD CONSTRAINT "BlacklistedTokens_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_avatar_media_pk_fkey" FOREIGN KEY ("avatar_media_pk") REFERENCES "public"."Media"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_banner_media_pk_fkey" FOREIGN KEY ("banner_media_pk") REFERENCES "public"."Media"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_userPk_fkey" FOREIGN KEY ("userPk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserOIDCAccounts" ADD CONSTRAINT "UserOIDCAccounts_provider_pk_fkey" FOREIGN KEY ("provider_pk") REFERENCES "public"."Providers"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserOIDCAccounts" ADD CONSTRAINT "UserOIDCAccounts_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
