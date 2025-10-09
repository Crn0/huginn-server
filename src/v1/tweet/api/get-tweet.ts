import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getTweetById } from "@/v1/tweet/service/tweet.js";
import { toTweetResponse } from "../mapper/to-tweet-response.js";

import type { Request, Response } from "express";

export const getTweet = async (req: Request, res: Response) => {
  const tweetId = req.params["tweetId"] as string;

  const { error, data: tweet } = await tryCatch(getTweetById(tweetId));

  if (error) throw error;

  return res.status(OK).json({ ...toTweetResponse(tweet) });
};
