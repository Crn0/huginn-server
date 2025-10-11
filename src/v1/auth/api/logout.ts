import { NO_CONTENT } from "@/v1/constants/http-status.js";
import { AuthenticationError } from "@/lib/errors/auth-error.js";
import {
  blackListToken,
  getBlackListedTokenByJwtId,
} from "@/v1/black-listed-token/service/black-listed-token.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { cookieConfig } from "../configs/cookie.js";

import type { Request, Response } from "express";

export const logout = async (_req: Request, res: Response) => {
  const refreshToken = res.locals["refreshToken"];

  if (refreshToken) {
    const jwtId = refreshToken.jti as string;
    const exp = refreshToken.exp as number;
    const sub = refreshToken.sub as string;

    const refreshTokenBlackListed = await getBlackListedTokenByJwtId(jwtId);

    if (refreshTokenBlackListed) {
      throw new AuthenticationError("This session is no longer valid. Please log in again.");
    }

    const expiresAt = new Date(exp * 1000).toISOString();

    const { error } = await tryCatch(
      blackListToken({ jwtId, sub, expiresAt, type: "RefreshToken" })
    );

    if (error) throw error;

    res.clearCookie("refreshToken", cookieConfig);
  }

  return res.sendStatus(NO_CONTENT);
};
