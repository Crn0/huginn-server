import { rateLimit } from "express-rate-limit";
import { createUserSchema, userLoginSchema } from "@/v1/lib/user-schema.js";
import { ZodBodyValidator } from "@/v1/lib/validator.js";

import { loginRateLimitOptions, refreshRateLimitOptions } from "../configs/rate-limiter.js";
import { authenticatePassportLocal } from "../middleware/authenticate-local.js";
import { readRefreshToken } from "../middleware/read-refresh-token.js";
import { register } from "../api/register.js";
import { login } from "../api/login.js";
import { logout } from "../api/logout.js";

import type { Router } from "express";

export const registerPost = (router: Router) => {
  router.post("/register", ZodBodyValidator(createUserSchema), register);

  router.post(
    "/login",
    rateLimit(loginRateLimitOptions),
    ZodBodyValidator(userLoginSchema),
    authenticatePassportLocal,
    login
  );

  router.post("/logout", readRefreshToken, logout);

  router.post("/refresh-tokens", rateLimit(refreshRateLimitOptions), readRefreshToken, login);

  return router;
};
