import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetRepliesPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";

import type { getRepliesByAuthorUsernamePagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toUserRepliesResponse");

type Prop = Awaited<ReturnType<typeof getRepliesByAuthorUsernamePagination>>;

type ReplyTo = Prop["data"][number]["replyTo"];

const transformReplyTo = (replyTo: ReplyTo) => {
  if (!replyTo) return null;

  return {
    ...replyTo,
    author: {
      ...replyTo.author,
      profile: {
        ...replyTo.author.profile,
        avatarUrl: transformProfileAvatar(replyTo.author.profile!.avatar),
        bannerUrl: transformProfileBanner(replyTo.author.profile!.banner),
      },
    },
  };
};

export const toUserRepliesResponse = (props: Prop) => {
  const replies = props.data.map((reply) => ({
    ...reply,
    author: {
      ...reply.author,
      profile: {
        ...reply.author.profile,
        avatarUrl: transformProfileAvatar(reply.author.profile!.avatar),
        bannerUrl: transformProfileBanner(reply.author.profile!.banner),
      },
    },
    replyTo: transformReplyTo(reply.replyTo),
    media: reply.media.map(transformTweetMedia) ?? [],
  }));

  const parsedData = tweetRepliesPaginationSchema.safeParse({ ...props, data: replies });

  if (!parsedData.success) {
    console.log("foo", replies[0]?.replyTo?.author.profile);
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
