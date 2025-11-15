import { OK } from "@/v1/constants/http-status.js";
import { getTweetsByAuthorUsernamePagination } from "@/v1/tweet/service/tweet.js";
import { toUserTweetsResponse } from "../mapper/to-user-tweets-response.js";

import type { Request, Response } from "express";
import type { UserTweetQuery } from "@/v1/lib/tweet-schema.js";

export const getUserTweetsByUsername = async (req: Request, res: Response) => {
  const user = req.user;

  const username = req.params["username"] as string;

  const query: UserTweetQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const filter = {
    scope: query.scope,
  } as const;

  const pagination = await getTweetsByAuthorUsernamePagination(username, { cursor, filter });

  return res.status(OK).json({ ...toUserTweetsResponse(pagination, user) });
};
