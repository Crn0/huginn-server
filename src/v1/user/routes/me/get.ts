import { getAuthUser } from "../../api/get-auth-user.js";

import type { Router } from "express";

export const meGet = (router: Router) => {
  router.get("/me", getAuthUser);

  return router;
};
