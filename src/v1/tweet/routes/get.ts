import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { tweetQuerySchema } from "../schema/tweet.js";
import { getTweets } from "../api/get-tweets.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get("/", ZodQueryValidator(tweetQuerySchema), getTweets);

  return router;
};
