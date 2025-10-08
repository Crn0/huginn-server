import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { likeTweet as create } from "../service/like.js";

import type { Request, Response } from "express";

export const likeTweet = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const tweetId = req.params["tweetId"] as string;

  const { error } = await tryCatch(create(userId, tweetId));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
