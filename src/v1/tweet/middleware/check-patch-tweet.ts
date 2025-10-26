import { tryCatch } from "@/v1/lib/try-catch.js";
import { tweetPolicy } from "../policy/index.js";
import { getTweetById } from "../repository/tweet.js";

import type { Request, Response, NextFunction } from "express";

export const checkPatchTweet = async (req: Request, _res: Response, next: NextFunction) => {
  const tweetId = req.params?.["tweetId"] as string;

  const user = req.user!;

  const tweet = await getTweetById(tweetId);

  const { error } = tryCatch(() => tweetPolicy.patch(user, tweet));

  if (error) throw error;

  return next();
};
