// import { rateLimit } from "express-rate-limit";
import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { createTweetSchema } from "../schema/create-tweet.js";
import { tweetMediaProcessor } from "../middleware/tweet-media-processor.js";
import { createTweet } from "../api/create-tweet.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.post("/", tweetMediaProcessor, ZodBodyValidator(createTweetSchema), createTweet);

  return router;
};
