import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { patchUsernameSchema } from "../../schema/patch-username.js";
import { patchUsername } from "../../api/patch-username.js";

import type { Router } from "express";

export const mePatch = (router: Router) => {
  router.patch("/me/username", ZodBodyValidator(patchUsernameSchema), patchUsername);

  return router;
};
