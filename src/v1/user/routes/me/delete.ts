import { ZodParamValidation } from "@/v1/lib/validator.js";
import { userFollowSchema } from "../../schema/user-follow.js";
import { checkDeleteAccount } from "../../middleware/check-delete-account.js";
import { checkDeleteOIDCAccount } from "../../middleware/check-delete-oidc-account.js";
import { deleteAccount } from "../../api/delete-account.js";
import { unFollowUser } from "../../api/unfollow-user.js";
import { deleteOIDCAccount } from "../../api/delete-oidc-account.js";

import type { Router } from "express";

export const meDelete = (router: Router) => {
  router.delete("/me", checkDeleteAccount, deleteAccount);

  router.delete("/me/providers/google", checkDeleteOIDCAccount, deleteOIDCAccount("google"));

  router.delete("/me/following/:followId", ZodParamValidation(userFollowSchema), unFollowUser);

  return router;
};
