// import { rateLimit } from "express-rate-limit";
import { ZodBodyValidator, ZodParamValidation } from "@/v1/lib/validator.js";
import { tweetIdSchema } from "../schema/tweet.js";
import { patchTweetSchema } from "../schema/patch-tweet.js";
import { checkPatchTweet } from "../middleware/check-patch-tweet.js";
import { patchTweet } from "../api/patch.tweet.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.patch(
    "/:tweetId",
    ZodBodyValidator(patchTweetSchema),
    ZodParamValidation(tweetIdSchema),
    checkPatchTweet,
    patchTweet
  );

  return router;
};
