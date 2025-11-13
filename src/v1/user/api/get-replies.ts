import { OK } from "@/v1/constants/http-status.js";
import { getRepliesByAuthorUsernamePagination } from "@/v1/tweet/service/tweet.js";
import { toUserRepliesResponse } from "../mapper/to-user-replies-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getUserReplies = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const user = req.user;
  const username = req.params["username"] as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getRepliesByAuthorUsernamePagination(username, cursor);

  return res.status(OK).json({ ...toUserRepliesResponse(pagination, user) });
};
