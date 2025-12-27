import fs from "fs/promises";

import { TWEET_NAMESPACE } from "../socket/events.js";
import { OK } from "@/v1/constants/http-status.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { replyTweet as reply } from "../service/tweet.js";
import { sendNotification } from "@/v1/notification/service/index.js";
import { NOTIFICATION_NAMESPACE } from "@/v1/notification/socket/events.js";

import type { Request, Response } from "express";
import type { ReplyTweetDTO } from "../schema/reply-tweet.js";
import type { TweetMedia } from "../types/tweet.types.js";
import type { IO } from "@/lib/create-socket.js";
import type { TweetNameSpace } from "../socket/register.js";

const debug = createDebug("tweet:api:replyTweet");

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

  const io = req.app.get("socketIO") as IO;

  const replyToId = tweet.replyTo?.author.id as string;
  const replyToUsername = tweet.replyTo?.author.username as string;

  if (io && req.user) {
    const tweetNamespace: TweetNameSpace = io.of(TWEET_NAMESPACE);

    tweetNamespace.emit("tweet", {
      type: "create",
      entity: ["infinite-tweets", "list"],
      id: tweet.id,
    });

    if (req.user.id !== replyToId) {
      tryCatch(
        sendNotification({
          type: "REPLY",
          senderId: req.user.id,
          receiverId: replyToId,
          tweetId: tweet.id,
        })
      ).then(({ error: notificationError }) => {
        if (notificationError) {
          debug("notification error", notificationError);
          return;
        }

        io.of(NOTIFICATION_NAMESPACE)
          .to(replyToId)
          .emit("notification", {
            entity: ["notifications", "list", replyToUsername],
          });
      });
    }
  }

  return res
    .status(OK)
    .json({ id: tweet.id, content: tweet.content, replyTo: { id: tweet.replyTo?.id } });
};
