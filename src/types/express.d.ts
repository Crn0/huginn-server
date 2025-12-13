import "express";

import type { IO } from "@/lib/create-socket.ts";
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
    interface Application {
      socketIO: IO;
    }
  }
}
