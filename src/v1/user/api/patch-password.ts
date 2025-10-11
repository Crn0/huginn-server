import { tryCatch } from "@/v1/lib/try-catch.js";
import { patchPasswordById } from "../service/user-service.js";

import type { Request, Response, NextFunction } from "express";

export const patchPassword = async (req: Request, _res: Response, next: NextFunction) => {
  const { error } = await tryCatch(patchPasswordById(req.user!.id, req.body));

  if (error) throw error;

  return next();
};
