import { ZodParamValidation, ZodQueryValidator } from "@/v1/lib/validator.js";
import { tweetIdSchema, tweetQuerySchema } from "../schema/tweet.js";
import { getTweets } from "../api/get-tweets.js";
import { getTweet } from "../api/get-tweet.js";
import { getReplies } from "../api/get-replies.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get("/", ZodQueryValidator(tweetQuerySchema), getTweets);

  router.get("/:tweetId", ZodParamValidation(tweetIdSchema), getTweet);

  router.get(
    "/:tweetId/replies",
    ZodParamValidation(tweetIdSchema),
    ZodQueryValidator(tweetQuerySchema),
    getReplies
  );

  return router;
};
