import rateLimit, { type Options } from "express-rate-limit";

import type { Request, Response, NextFunction } from "express";

const rateLimitHandler: Options["handler"] = (
  _req: Request,
  res: Response,
  _next: NextFunction,
  options: Options
) => {
  const retryAfter = Math.ceil(options.windowMs / 1000); // seconds

  res.set("Retry-After", retryAfter.toString());

  res.status(options.statusCode).json({
    code: "RATE_LIMIT_EXCEEDED",
    message: options.message,
    retryAfter,
  });
};

// Login limiter (5/min)
export const loginRateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  message: "Too many login attempts. Try again later.",
  handler: rateLimitHandler,
} satisfies Partial<Options>;

// Refresh limiter config (20/min)
export const refreshRateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  message: "Too many refresh attempts. Try again later.",
  handler: rateLimitHandler,
} satisfies Partial<Options>;
