import fs from "fs/promises";

import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { replyTweet as reply } from "../service/tweet.js";

import type { Request, Response } from "express";
import type { ReplyTweetDTO } from "../schema/reply-tweet.js";
import type { TweetMedia } from "../types/tweet.types.js";

export const replyTweet = async (req: Request, res: Response) => {
  const DTO: ReplyTweetDTO = {
    content: req.body.content,
    replyTo: req.params["tweetId"] as string,
    authorId: req.user!.id,
    media: (req.files as TweetMedia[]) ?? [],
  };

  const { error, data: tweet } = await tryCatch(reply(DTO));

  if (DTO.media.length) {
    await Promise.all(DTO.media.map(async (file) => fs.unlink(file.path)));
  }

  if (error) throw error;

  return res
    .status(OK)
    .json({ id: tweet.id, content: tweet.content, replyTo: { id: tweet.replyTo?.id } });
};
