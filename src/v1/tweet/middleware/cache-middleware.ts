import * as cache from "@/v1/lib/cache.js";

import type { Response, NextFunction } from "express";
import type { RequestWithPagination } from "@/v1/types/express.js";

type TweetType = Extract<cache.NameSpace, "tweet:detail" | "tweet:list">;

type Request = RequestWithPagination<ParamsDictionary>;

interface ParamsDictionary {
  [key: string]: string;
}

const getCacheKey = (type: TweetType, req: Request) => {
  if (type !== "tweet:detail") {
    return req.originalUrl;
  }
  const tweetId = req.params["tweetId"];

  return `${tweetId}:${req.originalUrl}`;
};

export const cacheMiddleware =
  (namespace: TweetType, ttl: number) =>
  <TRequest extends Request, TResponse extends Response>(
    req: TRequest,
    res: TResponse,
    next: NextFunction
  ) => {
    const cacheKey = getCacheKey(namespace, req);

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
