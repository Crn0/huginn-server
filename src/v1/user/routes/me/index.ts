import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { meDelete } from "./delete.js";
import { meGet } from "./get.js";
import { mePatch } from "./patch.js";
import { mePost } from "./post.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.use("/me", protectedRoute);

  meGet(router);
  mePost(router);
  mePatch(router);
  meDelete(router);

  return router;
};
