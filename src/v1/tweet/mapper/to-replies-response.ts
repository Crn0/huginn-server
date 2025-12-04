import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { repliesPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import {
  transformProfileAvatar,
  transformProfileBanner,
} from "@/v1/user/mapper/transform-profile-media.js";
import { isRepost } from "@/v1/lib/is-tweet-repost.js";

import type { getRepliesPagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toRepliesResponse");

export const toRepliesResponse = (
  props: Awaited<ReturnType<typeof getRepliesPagination>>,
  user?: { id: string }
) => {
  const tweets = props.data.map((tweet) => ({
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
    isRepost: isRepost(tweet),
    reposted: !user ? false : tweet.repost.some((p) => p.user.id == user.id),
    liked: !user ? false : tweet.likes.some((p) => p.user.id == user.id),
    media: tweet.media.map(transformTweetMedia) ?? [],
    replies:
      tweet.replies.map((r) => {
        const reply = r as typeof tweet;
        return {
          ...reply,
          withReply: true,
          author: {
            ...reply.author,
            followed: !user ? false : reply.author.followedBy.some((u) => u.id === user.id),
            profile: {
              ...reply.author.profile,
              avatarUrl: transformProfileAvatar(reply.author.profile!.avatar),
              bannerUrl: transformProfileBanner(reply.author.profile!.banner),
            },
          },
          liked: !user ? false : reply.likes.some((p) => p.user.id == user.id),
          media: reply.media.map(transformTweetMedia) ?? [],
        };
      })
  }));

  const parsedData = repliesPaginationSchema.safeParse({ ...props, data: tweets });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
