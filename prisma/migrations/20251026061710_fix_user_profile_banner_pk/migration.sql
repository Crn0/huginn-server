--Drop the wrong fk
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_user_profile_banner_pk_fkey";

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_user_profile_banner_pk_fkey" FOREIGN KEY ("user_profile_banner_pk") REFERENCES "public"."UserProfiles"("primary_key") ON DELETE CASCADE ON UPDATE CASCADE;
