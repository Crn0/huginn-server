import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetsPaginationSchema } from "../schema/tweet.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import { transformProfileMedia } from "@/v1/user/mapper/transform-profile-media.js";

import type { getRepliesPagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toTweetsResponse");

export const toRepliesResponse = (props: Awaited<ReturnType<typeof getRepliesPagination>>) => {
  const tweets = props.replies.map((tweet) => ({
    ...tweet,
    author: {
      ...tweet.author,
      profile: {
        ...tweet.author.profile,
        avatar: transformProfileMedia(tweet.author.profile?.avatar ?? null),
        banner: transformProfileMedia(tweet.author.profile?.banner ?? null),
      },
    },
    media: tweet.media.map(transformTweetMedia) ?? [],
  }));

  const parsedData = tweetsPaginationSchema.safeParse({ ...props, tweets });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  const { tweets: replies, ...rest } = parsedData.data;

  return { ...rest, replies };
};
