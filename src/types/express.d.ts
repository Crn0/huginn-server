import "express";

import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
    }
    interface Locals<TQuery> {
      refreshToken?: JwtPayload & { username: string };
      query?: TQuery;
    }
  }
}
