-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('Mention', 'Reply', 'Follow');

-- CreateTable
CREATE TABLE "public"."Notifications" (
    "primary_key" INT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "type" "public"."NotificationType" NOT NULL,
    "tweet_primary_key" INTEGER,
    "sender_primary_key" INTEGER,
    "receiver_primary_key" INTEGER NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("primary_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "public"."Notifications"("id");

-- AddForeignKey
ALTER TABLE "public"."Notifications" ADD CONSTRAINT "Notifications_tweet_primary_key_fkey" FOREIGN KEY ("tweet_primary_key") REFERENCES "public"."Tweets"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notifications" ADD CONSTRAINT "Notifications_sender_primary_key_fkey" FOREIGN KEY ("sender_primary_key") REFERENCES "public"."Users"("primary_key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notifications" ADD CONSTRAINT "Notifications_receiver_primary_key_fkey" FOREIGN KEY ("receiver_primary_key") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
