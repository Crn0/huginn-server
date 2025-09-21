import { authenticatePassportGoogle } from "../middleware/authenticate-google.js";
import { googleAuthFlow } from "../middleware/google-auth-flow.js";
import { redirectAuthFlow } from "../api/redirect-auth-flow.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get("/google", authenticatePassportGoogle);

  router.get("/google/callback", googleAuthFlow, redirectAuthFlow);

  return router;
};
