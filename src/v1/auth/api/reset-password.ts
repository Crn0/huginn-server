import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { verifyToken } from "@/v1/lib/jwt.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { resetPassword as reset } from "v1/user/service/user-service.js";

import type { Request, Response } from "express";
import { getBlackListedTokenByJwtId } from "@/v1/black-listed-token/service/black-listed-token.js";

export const resetPassword = async (req: Request, res: Response) => {
  const password = req.body.password as string;

  const { error: tokenError, data: verifiedToken } = tryCatch(() => verifyToken(req.body.token));

  if (tokenError) throw tokenError;

  if (typeof verifiedToken === "string" || !verifiedToken) {
    throw new AuthenticationError("Invalid or expired token");
  }

  const { jti, sub, exp } = verifiedToken;

  const blacklistedToken = await getBlackListedTokenByJwtId(jti as string);

  if (blacklistedToken) {
    throw new AuthenticationError("Expired token");
  }

  const expiresAt = new Date((exp as number) * 1000).toISOString();

  const { error } = await tryCatch(
    reset(verifiedToken["sub"] as string, {
      password,
      token: { expiresAt, jwtId: jti as string, sub: sub as string },
    })
  );

  if (error) throw error;

  return res.sendStatus(NO_CONTENT);
};
