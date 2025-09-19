-- CreateTable
CREATE TABLE "public"."Tweets" (
    "primary_key" INT GENERATED ALWAYS AS IDENTITY,
    "id" UUID NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,
    "author_pk" INTEGER NOT NULL,
    "reply_pk" INTEGER,

    CONSTRAINT "Tweets_pkey" PRIMARY KEY ("primary_key")
);

-- CreateTable
CREATE TABLE "public"."_MediaToTweet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MediaToTweet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tweets_id_key" ON "public"."Tweets"("id");

-- CreateIndex
CREATE INDEX "_MediaToTweet_B_index" ON "public"."_MediaToTweet"("B");

-- AddForeignKey
ALTER TABLE "public"."Tweets" ADD CONSTRAINT "Tweets_author_pk_fkey" FOREIGN KEY ("author_pk") REFERENCES "public"."Users"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tweets" ADD CONSTRAINT "Tweets_reply_pk_fkey" FOREIGN KEY ("reply_pk") REFERENCES "public"."Tweets"("primary_key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MediaToTweet" ADD CONSTRAINT "_MediaToTweet_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Medias"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MediaToTweet" ADD CONSTRAINT "_MediaToTweet_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tweets"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
