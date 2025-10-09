import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetsPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import { transformProfileMedia } from "./transform-profile-media.js";

import type { getTweetsByAuthorIdPagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toUserTweetsResponse");

export const toUserTweetsResponse = (
  props: Awaited<ReturnType<typeof getTweetsByAuthorIdPagination>>
) => {
  const tweets = props.data.map((tweet) => ({
    ...tweet,
    author: {
      ...tweet.author,
      profile: {
        ...tweet.author.profile,
        avatar: transformProfileMedia(tweet.author.profile!.avatar),
        banner: transformProfileMedia(tweet.author.profile!.banner),
      },
    },
    media: tweet.media.map(transformTweetMedia) ?? [],
  }));

  const parsedData = tweetsPaginationSchema.safeParse({ ...props, data: tweets });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
