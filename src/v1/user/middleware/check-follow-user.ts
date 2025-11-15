import { tryCatch } from "@/v1/lib/try-catch.js";
import { userPolicy } from "../policy/index.js";

import type { Request, Response, NextFunction } from "express";

export const checkFollowUser = async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user!;
  const followUsername = req.body["username"] as string;

  const targetUser = { username: followUsername };

  const { error } = tryCatch(() => userPolicy.following.followUser(user, targetUser));

  if (error) throw error;

  return next();
};
