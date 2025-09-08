import passport from "passport";

import { AuthenticationError } from "@/lib/errors/auth-error.js";

import type { Request, Response, NextFunction } from "express";
import type { AuthUser } from "@/v1/types/user.types.js";

export const authenticatePassportLocal = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: AuthUser, info: { message?: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new AuthenticationError(info?.message ?? "Invalid credentials.");
      }

      req.user = user;

      return next();
    }
  )(req, res, next);
