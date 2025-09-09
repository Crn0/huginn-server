import { NO_CONTENT_REFRESH } from "@/v1/constants/http-status.js";
import {
  blackListToken,
  getBlackListedTokenByJwtId,
} from "@/v1/black-listed-token/service/black-listed-token.js";
import { cookieConfig } from "../configs/cookie.js";

import type { Request, Response } from "express";

export const logout = async (_req: Request, res: Response) => {
  const refreshToken = res.locals?.refreshToken;

  res.clearCookie("refreshToken", cookieConfig);

  if (refreshToken) {
    const jwtId = refreshToken.jti as string;
    const exp = refreshToken.exp as number;
    const sub = refreshToken.sub as string;

    const refreshTokenBlackListed = await getBlackListedTokenByJwtId(jwtId);

    if (refreshTokenBlackListed) {
      return res.sendStatus(NO_CONTENT_REFRESH);
    }

    const expiresAt = new Date(exp * 1000).toISOString();

    await blackListToken({ jwtId, sub, expiresAt, type: "RefreshToken" });
  }

  return res.sendStatus(NO_CONTENT_REFRESH);
};
