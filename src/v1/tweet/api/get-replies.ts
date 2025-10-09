import { OK } from "@/v1/constants/http-status.js";
import { getRepliesPagination } from "@/v1/tweet/service/tweet.js";
import { toTweetsResponse } from "../mapper/to-tweets-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { TweetQuery } from "@/v1/lib/tweet-schema.js";

export const getReplies = async (
  req: RequestWithPagination<{ tweetId: string }>,
  res: Response
) => {
  const tweetId = req.params.tweetId as string;

  const query: TweetQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getRepliesPagination(tweetId, { cursor });

  return res.status(OK).json({ ...toTweetsResponse(pagination) });
};
