// import { rateLimit } from "express-rate-limit";
import { ZodParamValidation } from "@/v1/lib/validator.js";
import { tweetIdSchema } from "../schema/tweet.js";
import { deleteTweet } from "../api/delete-tweet.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.delete("/:tweetId", ZodParamValidation(tweetIdSchema), deleteTweet);

  return router;
};
