import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetMediaPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "./transform-tweet-media.js";

import type { getMediaByUploaderIdPagination } from "@/v1/media/service/media.js";

const debug = createDebug("user:mapper:toUserMediaResponse");

export const toUserTweetMediaResponse = (
  props: Awaited<ReturnType<typeof getMediaByUploaderIdPagination>>
) => {
  const media = props.media.map(transformTweetMedia);

  const parsedData = tweetMediaPaginationSchema.safeParse({ ...props, media });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
