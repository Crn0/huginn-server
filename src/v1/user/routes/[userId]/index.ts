import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { userIdGet } from "./get.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.use('/:userId', protectedRoute);
  
  userIdGet(router);

  return router;
};
