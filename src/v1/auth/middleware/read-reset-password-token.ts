import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { getBlackListedTokenByJwtId } from "@/v1/black-listed-token/service/black-listed-token.js";
import { verifyToken } from "@/v1/lib/jwt.js";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

export const readResetPasswordToken = async (req: Request, _res: Response, next: NextFunction) => {
  const accessToken = req.params["token"] as string;

  const verifiedToken = verifyToken(accessToken) as JwtPayload & { username: string };

  if (typeof verifiedToken.sub !== "string") {
    throw new AuthenticationError("Invalid or expired token");
  }

  const blacklistedToken = await getBlackListedTokenByJwtId(verifiedToken.jti as string);

  if (blacklistedToken) {
    throw new AuthenticationError("Expired token");
  }

  req.user = { id: verifiedToken.sub, username: verifiedToken.username };

  next();
};
