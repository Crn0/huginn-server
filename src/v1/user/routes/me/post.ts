import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { userFollowSchema } from "../../schema/user-follow.js";
import { followUser } from "../../api/follow-user.js";

import type { Router } from "express";

export const mePost = (router: Router) => {
  router.post("/me/following", ZodBodyValidator(userFollowSchema), followUser);

  return router;
};
