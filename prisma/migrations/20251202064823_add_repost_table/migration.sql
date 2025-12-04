-- CreateTable
CREATE TABLE "public"."Repost" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tweet_pk" INTEGER NOT NULL,
    "user_pk" INTEGER NOT NULL,

    CONSTRAINT "Repost_pkey" PRIMARY KEY ("tweet_pk","user_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repost_id_key" ON "public"."Repost"("id");

-- AddForeignKey
ALTER TABLE "public"."Repost" ADD CONSTRAINT "Repost_tweet_pk_fkey" FOREIGN KEY ("tweet_pk") REFERENCES "public"."Tweets"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Repost" ADD CONSTRAINT "Repost_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
