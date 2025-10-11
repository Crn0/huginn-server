import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { OK } from "@/v1/constants/http-status.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@/v1/lib/jwt.js";
import {
  blackListToken,
  getBlackListedTokenByJwtId,
} from "@/v1/black-listed-token/service/black-listed-token.js";
import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { cookieConfig } from "../configs/cookie.js";

import type { Request, Response } from "express";
import type { AuthUser } from "@/v1/types/user.types.js";

const REFRESH_TOKEN_EXPIRATION = 7 as const; // 7 days
const ACCESS_TOKEN_EXPIRATION = 15 as const; // 15 mins

export const login = async (req: Request, res: Response) => {
  const oldRefreshToken: string = req.cookies["refreshToken"];

  if (oldRefreshToken) {
    res.clearCookie("refreshToken", cookieConfig);

    const verifiedToken = verifyToken(oldRefreshToken);

    if (typeof verifiedToken === "string") {
      throw new InternalServerError("Something went wrong");
    }

    const jwtId = verifiedToken?.jti;
    const sub = verifiedToken?.sub;
    const exp = verifiedToken?.exp;

    if (typeof jwtId !== "string" || typeof sub !== "string" || typeof exp !== "number") {
      throw new AuthenticationError("Expired or invalid token.");
    }

    const tokenExist = await getBlackListedTokenByJwtId(jwtId);

    if (tokenExist) {
      throw new AuthenticationError("Refresh token reuse detected. Please log in again.");
    }

    const expiresAt = new Date(exp * 1000).toISOString();

    await blackListToken({ jwtId, sub, expiresAt, type: "RefreshToken" });

    req.user = { id: sub };
  }

  const user = req.user as AuthUser;

  const refreshToken = generateRefreshToken(user.id, REFRESH_TOKEN_EXPIRATION);
  const accessToken = generateAccessToken(user.id, ACCESS_TOKEN_EXPIRATION);

  res.cookie("refreshToken", refreshToken, cookieConfig);

  return res.status(OK).json({ token: accessToken });
};
