import { OK } from "@/v1/constants/http-status.js";
import { getMediaByTweetContentPagination } from "@/v1/media/service/media.js";
import { toMediaResponse } from "../mapper/media-response.js";

import type { Request, Response } from "express";
import type { MediaPagination } from "../schema/media-pagination.js";

export const getMedia = async (_req: Request, res: Response) => {
  const query: MediaPagination = res.locals["query"];

  const cursor = {
    before: query.before,
    after: query.after,
  } as const;

  const pagination = await getMediaByTweetContentPagination(query.search, cursor);

  return res.status(OK).json({ ...toMediaResponse(pagination) });
};
