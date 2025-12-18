import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { TWEET_NAMESPACE } from "../socket/events.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { deleteTweetById } from "../service/tweet.js";

import type { Request, Response } from "express";
import type { IO } from "@/lib/create-socket.js";
import type { TweetNameSpace } from "../socket/register.js";

export const deleteTweet = async (req: Request, res: Response) => {
  const id = req.params["tweetId"] as string;

  const { error, data } = await tryCatch(deleteTweetById(id));

  if (error) {
    throw error;
  }

  const tweet = data.tweet;

  const io = req.app.get("socketIO") as IO | undefined;

  if (io) {
    const namespace: TweetNameSpace = io.of(TWEET_NAMESPACE);

    namespace.except(req.user!.id).emit("tweet", {
      type: "delete",
      entity: ["infinite-tweets", "list"],
      id: tweet.id,
    });
  }

  return res.sendStatus(NO_CONTENT);
};
