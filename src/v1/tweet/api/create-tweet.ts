import fs from "fs/promises";

import { TWEET_NAMESPACE } from "../socket/events.js";
import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { createTweet as create } from "../service/tweet.js";

import type { Request, Response } from "express";
import type { CreateTweetDTO } from "../schema/create-tweet.js";
import type { TweetMedia } from "../types/tweet.types.js";
import type { IO } from "@/lib/create-socket.js";
import type { TweetNameSpace } from "../socket/register.js";

export const createTweet = async (req: Request, res: Response) => {
  const DTO: CreateTweetDTO = {
    content: req.body.content,
    authorId: req.user!.id,
    media: (req.files as TweetMedia[]) ?? [],
  };

  const { error, data: tweet } = await tryCatch(create(DTO));

  if (DTO.media.length) {
    await Promise.all(DTO.media.map(async (file) => fs.unlink(file.path)));
  }

  if (error) throw error;

  const io = req.app.get("socketIO") as IO | undefined;

  if (io) {
    const namespace: TweetNameSpace = io.of(TWEET_NAMESPACE);

    namespace.except(req.user!.id).emit("tweet", {
      type: "create",
      entity: ["infinite-tweets", "list"],
      id: tweet.id,
    });
  }

  return res.status(OK).json({ id: tweet.id, content: tweet.content });
};
