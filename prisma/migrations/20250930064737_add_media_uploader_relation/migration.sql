-- AlterTable
ALTER TABLE "public"."Media" ADD COLUMN     "uploaderPk" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_uploaderPk_fkey" FOREIGN KEY ("uploaderPk") REFERENCES "public"."Users"("primary_key") ON DELETE SET NULL ON UPDATE CASCADE;
