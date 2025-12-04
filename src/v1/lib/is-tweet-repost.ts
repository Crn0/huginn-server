import type { getTweets } from "../tweet/repository/tweet.js";

type Repost = Awaited<ReturnType<typeof getTweets>> & { repostId: string; reposterId: string };

export const isRepost = (tweet: unknown): tweet is Repost => {
  return typeof (tweet as Repost).repostId !== "undefined";
};
