import jwt from "jsonwebtoken";

import { env } from "@/configs/env.js";
import { generateId } from "./generate-id.js";
import { UNAUTHORIZED } from "../constants/http-status.js";
import { AuthenticationError } from "@/lib/errors/auth-error.js";

const secret = env.JWT_SECRET;

const DEFAULT_EXP_ACCESS_TOKEN = 15;
const DEFAULT_EXP_REFRESH_TOKEN = 15;

export const decodeToken = (token: string) => jwt.decode(token);

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    const err = error as jwt.TokenExpiredError | jwt.JsonWebTokenError;

    throw new AuthenticationError(err.message ?? "Invalid or expired token", UNAUTHORIZED);
  }
};

export const generateAccessToken = (
  id: string,
  expiresInMinutes: number = DEFAULT_EXP_ACCESS_TOKEN
) => jwt.sign({}, secret, { expiresIn: `${expiresInMinutes}M`, subject: id });

export const generateRefreshToken = (
  id: string,
  expiresInDays: number = DEFAULT_EXP_REFRESH_TOKEN
) =>
  jwt.sign({}, secret, {
    jwtid: generateId(),
    subject: id,
    expiresIn: `${expiresInDays}D`,
  });
