import { OK } from "@/v1/constants/http-status.js";
import { getFollowingByUsernamePagination } from "../service/follow-service.js";
import { toFollowingResponse } from "../mapper/to-following-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getFollowingUsername = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const username = req.params["username"] as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getFollowingByUsernamePagination(username, cursor);

  return res.status(OK).json({ ...toFollowingResponse(pagination) });
};
