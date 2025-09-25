import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { getAuthUser } from "../../api/get-auth-user.js";
import { getFollowers } from "../../api/get-followers.js";
import { getFollowing } from "../../api/get-following.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", getAuthUser);

  router.get("/me/followers", ZodQueryValidator(paginationQuerySchema), getFollowers);

  router.get("/me/following", ZodQueryValidator(paginationQuerySchema), getFollowing);

  return router;
};
