import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { deleteTweetById } from "../service/tweet.js";

import type { Request, Response } from "express";

export const deleteTweet = async (req: Request, res: Response) => {
  const id = req.params['tweetId'] as string

  const { error } = await tryCatch(deleteTweetById(id));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT)
};
