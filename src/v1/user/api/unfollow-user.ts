import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { unFollowUserById } from "../service/follow-service.js";

import type { Request, Response } from "express";

export const unFollowUser = async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const username = req.params["username"] as string;

  const { error } = await tryCatch(unFollowUserById(id, username));

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
