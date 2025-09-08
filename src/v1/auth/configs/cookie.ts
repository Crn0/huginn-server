import { env } from "@/configs/env.js";

export const cookieConfig = {
  httpOnly: true,
  secure: env.NODE_ENV === "prod",
  sameSite: env.NODE_ENV === "prod" ? "none" : "lax",
} as const;
