import { deleteAccount } from "../../api/delete-account.js";

import type { Router } from "express";

export const meDelete = (router: Router) => {
  router.delete("/me", deleteAccount);

  return router;
};
