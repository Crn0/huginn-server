import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { tweetQuerySchema, tweetIdSchema } from "@/v1/lib/tweet-schema.js";
import { getTweets } from "../api/get-tweets.js";
import { getTweet } from "../api/get-tweet.js";
import { getReplies } from "../api/get-replies.js";
import { cacheConfig } from "@/v1/configs/cache.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get(
    "/",
    ZodQueryValidator(tweetQuerySchema),
    cacheMiddleware("tweet:list", cacheConfig.defaultTtl),
    getTweets
  );

  router.get(
    "/:tweetId",
    ZodParamValidation(tweetIdSchema),
    cacheMiddleware("tweet:detail", cacheConfig.defaultTtl),
    getTweet
  );

  router.get(
    "/:tweetId/replies",
    ZodParamValidation(tweetIdSchema),
    ZodQueryValidator(tweetQuerySchema),
    getReplies
  );

  return router;
};
