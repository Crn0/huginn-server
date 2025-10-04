import { ZodParamValidation } from "@/v1/lib/validator.js";
import { userFollowSchema } from "../../schema/user-follow.js";
import { deleteAccount } from "../../api/delete-account.js";
import { unFollowUser } from "../../api/unfollow-user.js";

import type { Router } from "express";

export const meDelete = (router: Router) => {
  router.delete("/me", deleteAccount);

  router.delete("/me/following/:followId", ZodParamValidation(userFollowSchema), unFollowUser);

  return router;
};
