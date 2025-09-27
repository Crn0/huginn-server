import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { userTweetsPaginationSchema } from "../schema/user-tweet.js";
import { transformTweetMedia } from "./transform-tweet-media.js";

import type { getTweetsByAuthorIdPagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug('user:mapper:toUserTweetsResponse')

export const toUserTweetsResponse = (props: Awaited<ReturnType<typeof getTweetsByAuthorIdPagination>>) => {
  const tweets = props.tweets.map((tweet) => ({...tweet, media: tweet.media.map(transformTweetMedia) ?? []}))

  const parsedData = userTweetsPaginationSchema.safeParse({...props, tweets});

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues)
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
