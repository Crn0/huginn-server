import fs from "fs/promises";

import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { createTweet as create } from "../service/tweet.js";

import type { Request, Response } from "express";
import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { TweetMedia } from "../types/tweet.types.js";

export const createTweet = async (req: Request, res: Response) => {
  const DTO: CreateTweetDTO = {
    content: req.body.content,
    authorId: req.user!.id,
    medias: req.files as TweetMedia[],
  };

  const { error, data: tweet } = await tryCatch(create(DTO));

  if (DTO.medias.length) {
    await Promise.all(DTO.medias.map(async (file) => fs.unlink(file.path)));
  }

  if (error) throw error;

  return res.status(OK).json({ id: tweet.id, content: tweet.content });
};
