import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { usernameGet } from "./get.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.use("/:username", protectedRoute);

  usernameGet(router);

  return router;
};
