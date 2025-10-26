import { OK } from "@/v1/constants/http-status.js";
import { toTweetsResponse } from "@/v1/tweet/mapper/to-tweets-response.js";
import { getLikedTweetsPagination } from "@/v1/tweet/service/tweet.js";

import type { Request, Response } from "express";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getLikedTweets = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getLikedTweetsPagination(userId, { cursor });

  return res.status(OK).json(toTweetsResponse(pagination));
};
