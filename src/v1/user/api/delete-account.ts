import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { createDebug } from "@/v1/lib/debug.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { cookieConfig } from "@/v1/auth/configs/cookie.js";
import { deleteUserById } from "../service/user-service.js";

import type { Request, Response } from "express";

const debug = createDebug("middleware:deleteAccount");

export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const { error, data } = await tryCatch(deleteUserById(userId));

  if (error) throw error;

  debug("deleted user:", data.user);
  debug("deleted tweet count:", data.tweetCount);
  res.clearCookie("refreshToken", cookieConfig);

  return res.sendStatus(NO_CONTENT);
};
