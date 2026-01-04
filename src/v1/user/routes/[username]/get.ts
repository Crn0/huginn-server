import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { usernameSchema } from "../../schema/user.js";
import { getUserFollows } from "../../api/get-follow.js";
import { getUserTweetsByUsername } from "../../api/get-tweets.js";
import { getUserTweetMediaByUsername } from "../../api/get-media.js";
import { getUser } from "../../api/get-user.js";
import { checkGetLikedTweets } from "../../middleware/check-get-liked-tweets.js";
import { userTweetQuerySchema } from "@/v1/lib/tweet-schema.js";
import { followUsersQueryParamSchema } from "../../schema/follow.js";
import { cacheConfig } from "@/v1/configs/cache.js";
import { cacheMiddleware } from "../../middleware/cache-middleware.js";
import { userTweetCacheMiddleware } from "../../middleware/user-tweet-cache-middleware.js";

import type { Router } from "express";

export const usernameGet = (router: Router) => {
  router.get(
    "/:username",
    cacheMiddleware("user:detail", cacheConfig.popularQueryTTL),
    ZodParamValidation(usernameSchema),
    getUser
  );

  router.get(
    "/:username/follow",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(followUsersQueryParamSchema),
    cacheMiddleware("user:follow", cacheConfig.defaultTtl),
    getUserFollows
  );

  router.get(
    "/:username/tweets",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(userTweetQuerySchema),
    checkGetLikedTweets,
    userTweetCacheMiddleware(cacheConfig.defaultTtl),
    getUserTweetsByUsername
  );

  router.get(
    "/:username/media",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    cacheMiddleware("user:media", cacheConfig.defaultTtl),
    getUserTweetMediaByUsername
  );

  return router;
};
