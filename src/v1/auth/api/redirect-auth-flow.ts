import { env } from "@/configs/env.js";
import { cookieConfig } from "../configs/cookie.js";
import { generateRefreshToken } from "@/v1/lib/jwt.js";

import type { Request, Response } from "express";

export const redirectAuthFlow = async (req: Request, res: Response) => {
  const user = req.user as { id: string };

  let redirectURL = env.CLIENT_URL;

  const refreshToken = generateRefreshToken(user.id);

  res.cookie("refreshToken", refreshToken, cookieConfig);

  if (!redirectURL.endsWith("/")) {
    redirectURL += "/";
  }

  return res.redirect(redirectURL);
};
