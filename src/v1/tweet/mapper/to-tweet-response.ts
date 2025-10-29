import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import {
  transformProfileAvatar,
  transformProfileBanner,
} from "@/v1/user/mapper/transform-profile-media.js";

import type { getTweetById } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toTweetResponse");

export const toTweetResponse = (tweet: Awaited<ReturnType<typeof getTweetById>>) => {
  const _tweet = {
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
  };

  const parsedData = tweetSchema.safeParse(_tweet);

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
