import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { usernameSchema } from "../../schema/user.js";
import { getUserFollows } from "../../api/get-follow.js";
import { getUserTweetsByUsername } from "../../api/get-tweets.js";
import { getUserTweetMediaByUsername } from "../../api/get-media.js";
import { getUser } from "../../api/get-user.js";

import type { Router } from "express";
import { checkGetLikedTweets } from "../../middleware/check-get-liked-tweets.js";
import { userTweetQuerySchema } from "@/v1/lib/tweet-schema.js";
import { followUsersQueryParamSchema } from "../../schema/follow.js";

export const usernameGet = (router: Router) => {
  router.get("/:username", ZodParamValidation(usernameSchema), getUser);

  router.get("/:username/follow", ZodParamValidation(usernameSchema), ZodQueryValidator(followUsersQueryParamSchema), getUserFollows )

  router.get(
    "/:username/tweets",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(userTweetQuerySchema),
    checkGetLikedTweets,
    getUserTweetsByUsername
  );

  // router.get(
  //   "/:username/tweets/replies",
  //   ZodParamValidation(usernameSchema),
  //   ZodQueryValidator(paginationQuerySchema),
  //   getUserReplies
  // );

  // router.get(
  //   "/:username/tweets/likes",
  //   ZodParamValidation(usernameSchema),
  //   ZodQueryValidator(paginationQuerySchema),
  //   checkGetLikedTweets,
  //   getLikedTweets
  // );

  router.get(
    "/:username/media",
    ZodParamValidation(usernameSchema),
    ZodQueryValidator(paginationQuerySchema),
    getUserTweetMediaByUsername
  );

  return router;
};
