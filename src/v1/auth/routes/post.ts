import { rateLimit } from "express-rate-limit";

import { ZodBodyValidator } from "@/v1/lib/validator.js";

import { createUserSchema, userLoginSchema } from "@/v1/lib/user-schema.js";
import { requestResetPasswordSchema } from "../schema/reset-password.js";

import {
  loginRateLimitOptions,
  refreshRateLimitOptions,
  resetPasswordLimitOptions,
} from "../configs/rate-limiter.js";
import { authenticatePassportLocal } from "../middleware/authenticate-local.js";
import { readRefreshToken } from "../middleware/read-refresh-token.js";
import { register as registerApi } from "../api/register.js";
import { login } from "../api/login.js";
import { logout } from "../api/logout.js";
import { requestResetPassword } from "../api/request-reset-password.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.post("/register", ZodBodyValidator(createUserSchema), registerApi);

  router.post(
    "/login",
    rateLimit(loginRateLimitOptions),
    ZodBodyValidator(userLoginSchema),
    authenticatePassportLocal,
    login
  );

  router.post("/logout", readRefreshToken, logout);

  router.post("/refresh-tokens", rateLimit(refreshRateLimitOptions), readRefreshToken, login);

  router.post(
    "/reset-password",
    rateLimit(resetPasswordLimitOptions),
    ZodBodyValidator(requestResetPasswordSchema),
    requestResetPassword
  );

  return router;
};
