import { createDebug } from "@/v1/lib/debug.js";
import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { NOTIFICATION_NAMESPACE } from "@/v1/notification/socket/events.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { followUser as follow } from "../service/follow-service.js";
import {
  getLatestNotificationBetweenUsers,
  sendNotification,
} from "@/v1/notification/service/index.js";

import type { Request, Response } from "express";

import type { IO } from "@/lib/create-socket.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const debug = createDebug("user:api:followUser");

export const followUser = async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const followId = req.body["followId"] as string;

  const { error, data } = await tryCatch(follow(id, followId));

  if (error) throw error;

  const io = req.app.get("socketIO") as IO;

  const cutoffDate = new Date(Date.now() - ONE_DAY_MS);

  const notification = await getLatestNotificationBetweenUsers(
    "FOLLOW",
    req.user!.id,
    followId,
    cutoffDate
  );

  if (io && !notification) {
    const followUsername = data.following[0]?.username;

    if (followUsername) {
      tryCatch(
        sendNotification({
          type: "FOLLOW",
          senderId: req.user!.id,
          receiverId: followId,
        })
      ).then(({ error: notificationError, data: notification }) => {
        if (notificationError) {
          debug("notification error", notificationError);
          return;
        }

        io.of(NOTIFICATION_NAMESPACE)
          .to(followId)
          .emit("notification", {
            entity: ["notifications", "list", followUsername],
            id: notification.id,
          });
      });
    }
  }

  return res.sendStatus(NO_CONTENT);
};
