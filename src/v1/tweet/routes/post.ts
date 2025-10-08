// import { rateLimit } from "express-rate-limit";
import { ZodBodyValidator, ZodParamValidation } from "@/v1/lib/validator.js";
import { createTweetSchema } from "../schema/create-tweet.js";
import { replyTweetSchema } from "../schema/reply-tweet.js";
import { tweetIdSchema } from "../schema/tweet.js";
import { tweetMediaProcessor } from "../middleware/tweet-media-processor.js";
import { createTweet } from "../api/create-tweet.js";
import { replyTweet } from "../api/reply-tweet.js";
import { likeTweet } from "../api/like-tweet.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.post("/", tweetMediaProcessor, ZodBodyValidator(createTweetSchema), createTweet);

  router.post(
    "/:tweetId/replies",
    tweetMediaProcessor,
    ZodBodyValidator(replyTweetSchema),
    ZodParamValidation(tweetIdSchema),
    replyTweet
  );

  router.post("/:tweetId/likes", ZodParamValidation(tweetIdSchema), likeTweet);

  return router;
};
