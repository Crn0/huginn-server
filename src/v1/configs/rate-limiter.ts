import type { Request, Response, NextFunction } from "express";
import type { Options } from "express-rate-limit";

export const rateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute(s)
  limit: 200,
  standardHeaders: "draft-6",
  legacyHeaders: false,
  message: "Too many requests. try again later",
  handler: (_req: Request, res: Response, _next: NextFunction, options: Options) => {
    const retryAfter = Math.ceil(options.windowMs / 1000); // in seconds

    res.set("Retry-After", retryAfter.toString());

    res.status(options.statusCode).json({
      code: "RATE_LIMIT_EXCEEDED",
      message: options.message,
      retryAfter,
    });
  },
} satisfies Partial<Options>;
