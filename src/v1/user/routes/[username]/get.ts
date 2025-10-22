import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { usernameSchema } from "../../schema/user.js";
import { getFollowersByUsername } from "../../api/get-followers.js";
import { getFollowingUsername } from "../../api/get-following.js";
import { getUserTweetsByUsername } from "../../api/get-tweets.js";
import { getUserTweetMediaByUsername } from "../../api/get-media.js";
import { getUser } from "../../api/get-user.js";

import type { Router } from "express";

export const usernameGet = (router: Router) => {
  router.get("/:username", ZodParamValidation(usernameSchema), getUser);

  router.get(
    "/:username/followers",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    getFollowersByUsername
  );

  router.get(
    "/:username/following",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    getFollowingUsername
  );

  router.get(
    "/:username/tweets",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    getUserTweetsByUsername
  );

  router.get(
    "/:username/media",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    getUserTweetMediaByUsername
  );

  return router;
};
