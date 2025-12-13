import { tryCatch } from "@/v1/lib/try-catch.js";
import { userPolicy } from "../policy/index.js";

import type { Request, Response, NextFunction } from "express";

export const checkFollowUser = async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user!;
  const followId = req.body["followId"] as string;

  const targetUser = { id: followId };

  const { error } = tryCatch(() => userPolicy.following.followUser(user, targetUser));

  if (error) throw error;

  return next();
};
