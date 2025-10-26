import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { verifyToken } from "@/v1/lib/jwt.js";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

export const readAccessToken = (req: Request, _res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "string") {
    return next();
  }

  const bearer = bearerHeader.split(" ");

  if (
    typeof bearer[0] !== "string" ||
    bearer.length !== 2 ||
    bearer[0].toLowerCase() !== "bearer"
  ) {
    throw new AuthenticationError("Invalid or expired token");
  }

  const accessToken = bearer[1];

  if (typeof accessToken !== "string") {
    throw new AuthenticationError("Invalid or expired token");
  }

  const verifiedToken = verifyToken(accessToken) as JwtPayload & { username: string };

  if (typeof verifiedToken.sub !== "string") {
    throw new AuthenticationError("Invalid or expired token");
  }

  req.user = { id: verifiedToken.sub, username: verifiedToken.username };

  next();
};
