import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetsPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import {
  transformProfileAvatar,
  transformProfileBanner,
} from "@/v1/user/mapper/transform-profile-media.js";
import { isRepost } from "@/v1/lib/is-tweet-repost.js";

import type { getTweetsPagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toTweetsResponse");

export const toTweetsResponse = (
  props: Awaited<ReturnType<typeof getTweetsPagination>>,
  user?: { id: string }
) => {
  const tweets = props.data.map((tweet) => {
    const transformedTweet = {
      ...tweet,
      author: {
        ...tweet.author,
        followed: !user ? false : tweet.author.followedBy.some((u) => u.id === user.id),
        profile: {
          ...tweet.author.profile,
          avatarUrl:
            transformProfileAvatar(tweet.author.profile!.avatar) ??
            tweet.author.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ??
            null,
          bannerUrl: transformProfileBanner(tweet.author.profile!.banner),
        },
      },
      replyTo: tweet.replyTo
        ? {
            id: tweet.replyTo.author.id,
            tweetId: tweet.replyTo.id,
            username: tweet.replyTo.author.username,
          }
        : null,
      reposted: !user ? false : tweet.repost.some((p) => p.user.id == user.id),
      liked: !user ? false : tweet.likes.some((p) => p.user.id == user.id),
      media: tweet.media.map(transformTweetMedia) ?? [],
    };

    if (!isRepost(tweet)) {
      return {
        ...transformedTweet,
        isRepost: false,
      };
    }

    return {
      ...transformedTweet,
      isRepost: true,
      reposterId: tweet.reposterId,
    };
  });
  const parsedData = tweetsPaginationSchema.safeParse({ ...props, data: tweets });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
