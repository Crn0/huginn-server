import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetRepliesPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";
import { transformProfileMedia } from "./transform-profile-media.js";

import type { getRepliesByAuthorUsernamePagination } from "@/v1/tweet/service/tweet.js";

const debug = createDebug("user:mapper:toUserRepliesResponse");

export const toUserRepliesResponse = (
  props: Awaited<ReturnType<typeof getRepliesByAuthorUsernamePagination>>
) => {
  const replies = props.data.map((reply) => ({
    ...reply,
    author: {
      ...reply.author,
      profile: {
        ...reply.author.profile,
        avatar: transformProfileMedia(reply.author.profile!.avatar),
        banner: transformProfileMedia(reply.author.profile!.banner),
      },
    },
    media: reply.media.map(transformTweetMedia) ?? [],
  }));

  const parsedData = tweetRepliesPaginationSchema.safeParse({ ...props, data: replies });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
