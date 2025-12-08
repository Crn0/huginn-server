import { ZodBodyValidator } from "@/v1/lib/validator.js";
import { readNotificationSchema } from "../../lib/notification-schema.js";
import { readNotification } from "../api/read-notification.js";
import { checkPatchNotification } from "../middleware/check-patch-permission.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.post(
    "/read",
    ZodBodyValidator(readNotificationSchema),
    checkPatchNotification,
    readNotification
  );

  return router;
};
