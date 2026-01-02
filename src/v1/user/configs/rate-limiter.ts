import type { Options } from "express-rate-limit";

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
export const updateRateLimitOptions = (resource: "username" | "profile" | "password") =>
  ({
    windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    message: `Too many ${resource} update attempts. Try again later.`,
    handler: rateLimitHandler,
  }) satisfies Partial<Options>;
