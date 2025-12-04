
import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { deleteRepost } from "@/v1/repost/service/index.js";

import type { Request, Response } from "express";
import type { CreateRepost } from "@/v1/repost/schema/repost.js";

export const deleteTweetRepost = async (req: Request, res: Response) => {
  const DTO: CreateRepost = {
    tweetId: req.params["tweetId"] as string,
    userId: req.user!.id,
  };

  const { error } = await tryCatch(deleteRepost(DTO));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT)
};
