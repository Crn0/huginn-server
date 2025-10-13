import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { userIdSchema } from "../../schema/user.js";
import { getFollowers } from "../../api/get-followers.js";
import { getFollowing } from "../../api/get-following.js";
import { getUserTweets } from "../../api/get-tweets.js";
import { getUserTweetMedia } from "../../api/get-media.js";
import { getUser } from "../../api/get-user.js";

import type { Router } from "express";

export const userIdGet = (router: Router) => {
  router.get("/:userId", ZodParamValidation(userIdSchema), getUser);

  router.get(
    "/:userId/followers",
    ZodParamValidation(userIdSchema),
    ZodQueryValidator(paginationQuerySchema),
    getFollowers("userId")
  );

  router.get(
    "/:userId/following",
    ZodParamValidation(userIdSchema),
    ZodQueryValidator(paginationQuerySchema),
    getFollowing("userId")
  );

  router.get(
    "/:userId/tweets",
    ZodParamValidation(userIdSchema),
    ZodQueryValidator(paginationQuerySchema),
    getUserTweets("userId")
  );

  router.get(
    "/:userId/media",
    ZodParamValidation(userIdSchema),
    ZodQueryValidator(paginationQuerySchema),
    getUserTweetMedia("userId")
  );

  return router;
};
