import { AuthenticationError } from "@/lib/errors/auth-error.js";
import type { Request, Response, NextFunction } from "express";

export const protectedRoute = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user?.id) {
    throw new AuthenticationError("Unauthenticated. Please login");
  }

  next();
};
