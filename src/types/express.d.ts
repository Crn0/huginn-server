import "express";

import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
    interface Locals {
      refreshToken?: JwtPayload;
    }
  }
}
