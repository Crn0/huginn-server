import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { getAuthUser } from "../../api/get-auth-user.js";
import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { getNotifications } from "../../api/get-notifications.js";
import { cacheConfig } from "@/v1/configs/cache.js";
import { cacheMiddleware } from "../../middleware/cache-middleware.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", cacheMiddleware("user:auth", cacheConfig.popularQueryTTL), getAuthUser);

  router.get(
    "/me/notifications",
    cacheMiddleware("notification", cacheConfig.defaultTtl),
    ZodQueryValidator(paginationQuerySchema),
    getNotifications
  );

  return router;
};
