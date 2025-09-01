import { env } from "./env.js";

export const corsConfig = {
  origin: env.CORS_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 200,
};
