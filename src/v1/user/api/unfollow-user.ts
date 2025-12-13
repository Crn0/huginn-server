import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { unFollowUser as unfollow } from "../service/follow-service.js";

import type { Request, Response } from "express";

export const unFollowUser = async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const followId = req.params["followId"] as string;

  const { error } = await tryCatch(unfollow(id, followId));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
