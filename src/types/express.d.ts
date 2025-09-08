import "express";

import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
    interface Locals {
      refreshToken?: JwtPayload;
    }
  }
}
