import { OK } from "@/v1/constants/http-status.js";
import { getTweetsPagination } from "@/v1/tweet/service/tweet.js";
import { toTweetsResponse } from "../mapper/to-tweets-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { TweetQuery } from "../schema/tweet.js";

export const getTweets = async (req: RequestWithPagination, res: Response) => {
  const userId = req.user?.id;

  const query: TweetQuery = res.locals["query"];

  const filter = {
    content: query.content,
    where: query.where,
  } as const;

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getTweetsPagination(userId, { filter, cursor });

  return res.status(OK).json({ ...toTweetsResponse(pagination) });
};
