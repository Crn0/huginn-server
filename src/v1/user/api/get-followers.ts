import { OK } from "@/v1/constants/http-status.js";
import {
  getFollowersByIdPagination,
  getFollowersByUsernamePagination,
} from "../service/follow-service.js";
import { toFollowersResponse } from "../mapper/to-followers-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getFollowersById = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const id = req.user?.id as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getFollowersByIdPagination(id, cursor);

  return res.status(OK).json({ ...toFollowersResponse(pagination) });
};

export const getFollowersByUsername = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const username = req.params["username"] as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getFollowersByUsernamePagination(username, cursor);

  return res.status(OK).json({ ...toFollowersResponse(pagination) });
};
