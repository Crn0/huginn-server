import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { userIdGet } from "./get.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.use('/:userId', readAccessToken);
  
  userIdGet(router);

  return router;
};
