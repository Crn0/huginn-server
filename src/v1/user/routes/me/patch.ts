import { patchUsernameSchema } from "../../schema/patch-username.js";
import { patchUserProfileSchema } from "../../schema/patch-user-profile.js";
import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { profileMediaProcessor } from "../../middleware/profile-media-processor.js";
import { patchUsername } from "../../api/patch-username.js";
import { patchUserProfile } from "../../api/patch-user-profile.js";

import type { Router } from "express";

export const mePatch = (router: Router) => {
  router.patch("/me/username", ZodBodyValidator(patchUsernameSchema), patchUsername);

  router.patch(
    "/me/profile",
    profileMediaProcessor,
    ZodBodyValidator(patchUserProfileSchema),
    patchUserProfile
  );

  return router;
};
