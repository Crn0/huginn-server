import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { getAuthUser } from "../../api/get-auth-user.js";
import { getFollowersById } from "../../api/get-followers.js";
import { getFollowingById } from "../../api/get-following.js";
import { getUserTweetsByById } from "../../api/get-tweets.js";
import { getUserTweetMediaById } from "../../api/get-media.js";
import { getUserReplies } from "../../api/get-replies.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", getAuthUser);

  router.get("/me/followers", ZodQueryValidator(paginationQuerySchema), getFollowersById);

  router.get("/me/following", ZodQueryValidator(paginationQuerySchema), getFollowingById);

  router.get("/me/tweets", ZodQueryValidator(paginationQuerySchema), getUserTweetsByById);

  router.get("/me/tweets/replies", ZodQueryValidator(paginationQuerySchema), getUserReplies);

  router.get("/me/media", ZodQueryValidator(paginationQuerySchema), getUserTweetMediaById);

  return router;
};
