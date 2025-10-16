import { tryCatch } from "@/v1/lib/try-catch.js";
import { userPolicy } from "../policy/index.js";

import type { Request, Response, NextFunction } from "express";
import { getUserById } from "../service/user-service.js";

export const checkDeleteAccount = async (req: Request, _res: Response, next: NextFunction) => {
  const userId = req.user?.id as string;

  const user = await getUserById(userId);

  const { error } = tryCatch(() => userPolicy.delete(user));

  if (error) throw error;

  return next();
};
