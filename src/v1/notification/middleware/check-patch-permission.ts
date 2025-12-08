import { tryCatch } from "@/v1/lib/try-catch.js";
import { getNotifications } from "../service/index.js";
import { notificationPolicy } from "../policy/index.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

import type { Request, Response, NextFunction } from "express";
import type { ReadNotification } from "../../lib/notification-schema.js";

export const checkPatchNotification = async (
  req: Request<unknown, unknown, ReadNotification>,
  _res: Response,
  next: NextFunction
) => {
  const readIds = req.body.readIds;

  const user = req.user!;

  const { notifications } = await getNotifications(readIds);

  if (notifications.length <= 0) throw new NotFoundError("Notifications not found");

  notifications.forEach((n) => {
    const { error } = tryCatch(() => notificationPolicy.patch(user, n));

    if (error) throw error;
  });

  return next();
};
