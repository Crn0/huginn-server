import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { unlikeTweet as removeLike } from "../service/like.js";

import type { Request, Response } from "express";

export const unlikeTweet = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const tweetId = req.params["tweetId"] as string;

  const { error } = await tryCatch(removeLike(userId, tweetId));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
