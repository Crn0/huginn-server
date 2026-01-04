import * as cache from "@/v1/lib/cache.js";

import type { Request, Response, NextFunction } from "express";

export const cacheMiddleware =
  (ttl: number) =>
  <TRequest extends Request, TResponse extends Response>(
    req: TRequest,
    res: TResponse,
    next: NextFunction
  ) => {
    const username = req.user!.username;
    const cacheKey = `${username}:${req.originalUrl}`;

    const cachedData = cache.get("notification", cacheKey);

    const originalJson = res.json;

    if (cachedData) {
      return res.json({ ...cachedData });
    }

    const mutatedJson = (data: Record<string, unknown>) => {
      if (!cachedData) {
        cache.set("notification", cacheKey, data, ttl);
      }

      return originalJson.call(res, { ...data });
    };

    res.json = mutatedJson;

    return next();
  };
