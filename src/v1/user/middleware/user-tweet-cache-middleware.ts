import * as cache from "@/v1/lib/cache.js";

import type { UserTweetQuery } from "@/v1/lib/tweet-schema.js";
import type { Request, Response, NextFunction } from "express";

type NameSpace = Extract<cache.NameSpace, "user:tweets" | "user:likes">;

export const userTweetCacheMiddleware =
  (ttl: number) =>
  <TRequest extends Request, TResponse extends Response>(
    req: TRequest,
    res: TResponse,
    next: NextFunction
  ) => {
    const { scope }: UserTweetQuery = res.locals["query"];

    const namespace: NameSpace = scope === "likes" ? "user:likes" : "user:tweets";
    const username = req.params["username"];

    const cacheKey = `${username}:${req.originalUrl}`;

    const cachedData = cache.get(namespace, cacheKey);

    const originalJson = res.json;

    if (cachedData) {
      return res.json({ ...cachedData });
    }

    const mutatedJson = (data: Record<string, unknown>) => {
      if (!cachedData) {
        cache.set(namespace, cacheKey, data, ttl);
      }

      return originalJson.call(res, { ...data });
    };

    res.json = mutatedJson;

    return next();
  };
