import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { patchUsernameSchema } from "../../schema/patch-username.js";
import { patchUserProfileSchema } from "../../schema/patch-user-profile.js";
import { patchPasswordSchema } from "../../schema/patch-password.js";
import { profileMediaProcessor } from "../../middleware/profile-media-processor.js";
import { patchUsername } from "../../api/patch-username.js";
import { patchPassword } from "../../api/patch-password.js";
import { patchUserProfile } from "../../api/patch-user-profile.js";
import { readRefreshToken } from "@/v1/auth/middleware/read-refresh-token.js";
import { logout } from "@/v1/auth/api/logout.js";
import { checkPatchPassword } from "../../middleware/check-patch-password.js";

import type { Router } from "express";

export const mePatch = (router: Router) => {
  router.patch("/me/username", ZodBodyValidator(patchUsernameSchema), patchUsername);

  router.patch(
    "/me/password",
    readRefreshToken,
    ZodBodyValidator(patchPasswordSchema),
    checkPatchPassword,
    patchPassword,
    logout
  );

  router.patch(
    "/me/profile",
    profileMediaProcessor,
    ZodBodyValidator(patchUserProfileSchema),
    patchUserProfile
  );

  return router;
};
