import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { rateLimitOptions } from "../configs/rate-limiter.js";
import { router as authRouter } from "../auth/routes/index.js";

const router = Router();

router.use(rateLimit(rateLimitOptions));

router.use("/api/v1/auth", authRouter);

export { router };
