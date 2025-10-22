import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { followUserByUsername } from "../service/follow-service.js";

import type { Request, Response } from "express";

export const followUser = async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const followUsername = req.body["username"] as string;

  const { error } = await tryCatch(followUserByUsername(id, followUsername));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
