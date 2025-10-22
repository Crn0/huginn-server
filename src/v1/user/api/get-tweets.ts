import { OK } from "@/v1/constants/http-status.js";
import {
  getTweetsByAuthorIdPagination,
  getTweetsByAuthorUsernamePagination,
} from "@/v1/tweet/service/tweet.js";
import { toUserTweetsResponse } from "../mapper/to-user-tweets-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getUserTweetsByUsername = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const username = req.params["username"] as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getTweetsByAuthorUsernamePagination(username, cursor);

  return res.status(OK).json({ ...toUserTweetsResponse(pagination) });
};

export const getUserTweetsByById = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const id = req.user?.id as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getTweetsByAuthorIdPagination(id, cursor);

  return res.status(OK).json({ ...toUserTweetsResponse(pagination) });
};
