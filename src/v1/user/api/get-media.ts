import { OK } from "@/v1/constants/http-status.js";
import {
  getMediaByUploaderIdPagination,
  getMediaByUploaderUsernamePagination,
} from "@/v1/media/service/media.js";
import { toUserTweetMediaResponse } from "../mapper/to-user-tweet-media-response.js";

import type { Response } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";
import type { PaginationQuery } from "@/v1/lib/pagination-schema.js";

export const getUserTweetMediaById = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const id = req.user?.id as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getMediaByUploaderIdPagination(id, cursor);

  return res.status(OK).json({ ...toUserTweetMediaResponse(pagination) });
};

export const getUserTweetMediaByUsername = async (
  req: RequestWithPagination<{ username: string }>,
  res: Response
) => {
  const username = req.params["username"] as string;

  const query: PaginationQuery = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getMediaByUploaderUsernamePagination(username, cursor);

  return res.status(OK).json({ ...toUserTweetMediaResponse(pagination) });
};
