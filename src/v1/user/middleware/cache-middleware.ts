import { AuthenticationError } from "@/lib/errors/auth-error.js";
import * as cache from "@/v1/lib/cache.js";

import type { Request, Response, NextFunction } from "express";

type UserType = Extract<
  cache.NameSpace,
  | "user:auth"
  | "user:detail"
  | "user:list"
  | "user:tweets"
  | "user:likes"
  | "user:media"
  | "user:follow"
  | "notification"
>;

const getCacheKey = (type: UserType, req: Request) => {
  if (["user:follow", "user:tweets", "user:likes", "user:media"].includes(type)) {
    const username = req.params["username"];

    return `${username}:${req.originalUrl}`;
  }

  if (["user:auth", "notification"].includes(type)) {
    const user = req.user;

    if (!user) {
      throw new AuthenticationError("Unauthenticated");
    }

    return `${user.username}:${req.originalUrl}`;
  }

  return req.originalUrl;
};

export const cacheMiddleware =
  (namespace: UserType, ttl: number) =>
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
