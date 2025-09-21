import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { patchTweetById as patch } from "../service/tweet.js";

import type { Request, Response } from "express";
import type { PatchTweetDTO } from "../schema/patch-tweet.js";

export const patchTweet = async (req: Request, res: Response) => {
  const id = req.params['tweetId'] as string

  const DTO: PatchTweetDTO = {
    content: req.body.content,
  } as const

  const { error, data: tweet } = await tryCatch(patch(id, DTO));


  if (error) throw error;

  return res.status(OK).json({ id: tweet.id, content: tweet.content });
};
