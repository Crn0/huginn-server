import { tryCatch } from "@/v1/lib/try-catch.js";

import { readNotification as read } from "../service/index.js";
import { NO_CONTENT } from "@/v1/constants/http-status.js";

import type { Request, Response } from "express";
import type { ReadNotification } from "../../lib/notification-schema.js";

export const readNotification = async (
  req: Request<unknown, unknown, ReadNotification>,
  res: Response
) => {
  const readIds = req.body.readIds;

  const { error } = await tryCatch(read(readIds));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
