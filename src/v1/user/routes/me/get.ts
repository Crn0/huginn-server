import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { getAuthUser } from "../../api/get-auth-user.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { getNotifications } from "../../api/get-notifications.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", getAuthUser);

  router.get("/me/notifications", ZodQueryValidator(paginationQuerySchema), getNotifications);

  return router;
};
