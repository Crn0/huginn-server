import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetsPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "@/v1/tweet/mapper/transform-tweet-media.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";

import type { getTweetsByAuthorUsernamePagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toUserTweetsResponse");

export const toUserTweetsResponse = (
  props: Awaited<ReturnType<typeof getTweetsByAuthorUsernamePagination>>
) => {
  const tweets = props.data.map((tweet) => ({
    ...tweet,
    author: {
      ...tweet.author,
      profile: {
        ...tweet.author.profile,
        avatarUrl: transformProfileAvatar(tweet.author.profile!.avatar),
        bannerUrl: transformProfileBanner(tweet.author.profile!.banner),
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
