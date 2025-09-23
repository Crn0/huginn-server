import { OK } from "@/v1/constants/http-status.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { followUserById } from "../service/follow-service.js";

import type { Request, Response } from "express";

export const followUser = async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const followId = req.body["followId"] as string;

  const { error, data: updatedUser } = await tryCatch(followUserById(id, followId));

  if (error) throw error;

  return res.status(OK).json({
    id: updatedUser.id,
    followedId: followId,
  });
};
