CREATE extension IF NOT EXISTS pg_trgm;

-- CreateIndex
CREATE INDEX "UserProfiles_display_name_idx" ON "public"."UserProfiles" USING GIN ("display_name" gin_trgm_ops);
