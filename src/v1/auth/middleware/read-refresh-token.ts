import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { verifyToken } from "@/v1/lib/jwt.js";

import type { Request, Response, NextFunction } from "express";

export const readRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (typeof refreshToken !== "string") {
    throw new AuthenticationError("Invalid or expired token");
  }

  const verifiedToken = verifyToken(refreshToken);

  if (typeof verifiedToken === "string") {
    throw new AuthenticationError("Invalid or expired token");
  }

  res.locals.refreshToken = verifiedToken;

  next();
};
