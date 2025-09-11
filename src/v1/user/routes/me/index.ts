import { meGet } from "./get.js";

import type { Router } from "express";

export const register = (router: Router) => {
  meGet(router);

  return router;
};
