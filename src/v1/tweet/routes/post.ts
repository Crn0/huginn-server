// import { rateLimit } from "express-rate-limit";
import { ZodBodyValidator, ZodParamValidation } from "@/v1/lib/validator.js";
import { createTweetSchema } from "../schema/create-tweet.js";
import { replyTweetSchema } from "../schema/reply-tweet.js";
import { tweetIdSchema } from "@/v1/lib/tweet-schema.js";
import { handleTweetMedia, tweetMediaProcessor } from "../middleware/tweet-media-processor.js";
import { createTweet } from "../api/create-tweet.js";
import { replyTweet } from "../api/reply-tweet.js";
import { likeTweet } from "../api/like-tweet.js";
import { checkCreateTweet } from "../middleware/check-create-tweet.js";
import { createTweetRepost } from "../api/create-tweet-repost.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.post(
    "/",
    tweetMediaProcessor,
    handleTweetMedia,
    ZodBodyValidator(createTweetSchema),
    checkCreateTweet,
    createTweet
  );

  router.post(
    "/:tweetId/replies",
    tweetMediaProcessor,
    handleTweetMedia,
    ZodBodyValidator(replyTweetSchema),
    ZodParamValidation(tweetIdSchema),
    replyTweet
  );

  router.post("/:tweetId/likes", ZodParamValidation(tweetIdSchema), likeTweet);

  router.post("/:tweetId/repost", ZodParamValidation(tweetIdSchema), createTweetRepost);

  return router;
};
