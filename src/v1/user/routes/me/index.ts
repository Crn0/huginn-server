import { meGet } from "./get.js";
import { mePatch } from "./patch.js";

import type { Router } from "express";

export const register = (router: Router) => {
  meGet(router);
  mePatch(router);

  return router;
};
