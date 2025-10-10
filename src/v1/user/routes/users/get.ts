import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { userQuerySchema } from "@/v1/lib/user-schema.js";
import { getUsers } from "../../api/get-users.js";

import type { Router } from "express";

export const usersGet = (router: Router) => {
  router.get("/", protectedRoute, ZodQueryValidator(userQuerySchema), getUsers);

  return router;
};
