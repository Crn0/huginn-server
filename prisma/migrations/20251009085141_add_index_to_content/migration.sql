
CREATE extension IF NOT EXISTS pg_trgm;
-- CreateIndex
CREATE INDEX "Tweets_content_idx" ON "public"."Tweets" USING GIN ("content" gin_trgm_ops);
