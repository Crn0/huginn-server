import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { getAuthUser } from "../../api/get-auth-user.js";
import { getFollowers } from "../../api/get-followers.js";
import { getFollowing } from "../../api/get-following.js";
import { getUserTweets } from "../../api/get-tweets.js";
import { getUserTweetMedia } from "../../api/get-media.js";
import { getUserReplies } from "../../api/get-replies.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", getAuthUser);

  router.get("/me/followers", ZodQueryValidator(paginationQuerySchema), getFollowers("me"));

  router.get("/me/following", ZodQueryValidator(paginationQuerySchema), getFollowing("me"));

  router.get("/me/tweets", ZodQueryValidator(paginationQuerySchema), getUserTweets("me"));

  router.get("/me/tweets/replies", ZodQueryValidator(paginationQuerySchema), getUserReplies);

  router.get("/me/media", ZodQueryValidator(paginationQuerySchema), getUserTweetMedia("me"));

  return router;
};
