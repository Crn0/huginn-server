import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetSchema, type UserTweetQuery } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import {
  transformProfileAvatar,
  transformProfileBanner,
} from "@/v1/user/mapper/transform-profile-media.js";

import type { getTweetById } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toTweetResponse");

export const toTweetResponse = (
  tweet: Awaited<ReturnType<typeof getTweetById>>,
  user?: { id: string },
  scope?: UserTweetQuery["scope"]
) => {
  const _tweet = {
    ...tweet,
    withReply: scope === "replies",
    author: {
      ...tweet.author,
      followed: !user ? false : tweet.author.followedBy.some((u) => u.id === user.id),
      profile: {
        ...tweet.author.profile,
        avatarUrl: transformProfileAvatar(tweet.author.profile!.avatar),
        bannerUrl: transformProfileBanner(tweet.author.profile!.banner),
      },
    },
    replyTo:
      tweet.replyTo && scope === "replies"
        ? {
            ...tweet.replyTo,
            liked: !user ? false : tweet.replyTo.likes.some((p) => p.user.id == user.id),
            media: tweet.replyTo.media.map(transformTweetMedia) ?? [],
            withReply: false,
            replyTo: null,
            author: {
              ...tweet.replyTo.author,
              profile: {
                ...tweet.replyTo.author.profile,
                avatarUrl: transformProfileAvatar(tweet.replyTo.author.profile!.avatar),
                bannerUrl: transformProfileBanner(tweet.replyTo.author.profile!.banner),
              },
            },
          }
        : null,
    liked: !user ? false : tweet.likes.some((p) => p.user.id == user.id),
    media: tweet.media.map(transformTweetMedia) ?? [],
  };

  const parsedData = tweetSchema.safeParse(_tweet);

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
