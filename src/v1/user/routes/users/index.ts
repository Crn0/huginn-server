import { usersGet } from "./get.js";

import type { Router } from "express";

export const register = (router: Router) => {
  usersGet(router);

  return router;
};
