import { authenticatePassportGoogle } from "../middleware/authenticate-google.js";
import { googleAuthFlow } from "../middleware/google-auth-flow.js";
import { redirectAuthFlow } from "../api/redirect-auth-flow.js";
import { readResetPasswordToken } from "../middleware/read-reset-password-token.js";
import { getRequester } from "../api/get-reset-password-requester.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get("/google", authenticatePassportGoogle);

  router.get("/google/callback", googleAuthFlow, redirectAuthFlow);

  router.get("/reset-password/:token", readResetPasswordToken, getRequester);

  return router;
};
