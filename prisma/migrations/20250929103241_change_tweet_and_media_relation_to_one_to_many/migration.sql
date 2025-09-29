/*
  Warnings:

  - You are about to drop the `_MediaToTweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_MediaToTweet" DROP CONSTRAINT "_MediaToTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MediaToTweet" DROP CONSTRAINT "_MediaToTweet_B_fkey";

-- AlterTable
ALTER TABLE "public"."Media" ADD COLUMN     "tweetPk" INTEGER;

-- DropTable
DROP TABLE "public"."_MediaToTweet";

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_tweetPk_fkey" FOREIGN KEY ("tweetPk") REFERENCES "public"."Tweets"("primary_key") ON DELETE SET NULL ON UPDATE CASCADE;
