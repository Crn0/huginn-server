import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { userQuerySchema } from "@/v1/lib/user-schema.js";
import { getUsers } from "../../api/get-users.js";
import { cacheConfig } from "@/v1/configs/cache.js";
import { cacheMiddleware } from "../../middleware/cache-middleware.js";

import type { Router } from "express";

export const usersGet = (router: Router) => {
  router.get(
    "/",
    protectedRoute,
    ZodQueryValidator(userQuerySchema),
    cacheMiddleware("user:list", cacheConfig.popularQueryTTL),
    getUsers
  );

  return router;
};
