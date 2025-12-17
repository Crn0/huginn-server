import { rateLimit } from "express-rate-limit";

import { ZodBodyValidator } from "@/v1/lib/validator.js";

import { resetPasswordSchema } from "../schema/reset-password.js";

import { resetPasswordLimitOptions } from "../configs/rate-limiter.js";

import { resetPassword } from "../api/reset-password.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.patch(
    "/reset-password",
    rateLimit(resetPasswordLimitOptions),
    ZodBodyValidator(resetPasswordSchema),
    resetPassword
  );

  return router;
};
