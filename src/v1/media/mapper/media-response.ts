import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tweetMediaPaginationSchema } from "@/v1/lib/tweet-schema.js";
import { transformTweetMedia } from "@/v1/tweet/mapper/transform-tweet-media.js";

import type { getMediaByUploaderUsernamePagination } from "@/v1/media/service/media.js";

const debug = createDebug("media:mapper:toMediaResponse");

export const toMediaResponse = (
  props: Awaited<ReturnType<typeof getMediaByUploaderUsernamePagination>>
) => {
  const data = props.data.map(transformTweetMedia);

  const parsedData = tweetMediaPaginationSchema.safeParse({ ...props, data });

  if (!parsedData.success) {
    debug("issues", parsedData.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsedData.data;
};
