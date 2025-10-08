-- CreateTable
CREATE TABLE "public"."Likes" (
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_pk" INTEGER NOT NULL,
    "tweet_pk" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_pk","tweet_pk")
);

-- AddForeignKey
ALTER TABLE "public"."Likes" ADD CONSTRAINT "Likes_user_pk_fkey" FOREIGN KEY ("user_pk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Likes" ADD CONSTRAINT "Likes_tweet_pk_fkey" FOREIGN KEY ("tweet_pk") REFERENCES "public"."Tweets"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
