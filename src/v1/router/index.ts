import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { rateLimitOptions } from "../configs/rate-limiter.js";
import { router as authRouter } from "../auth/routes/index.js";
import { router as userRouter } from "../user/routes/index.js";
import { router as tweetRouter } from "../tweet/routes/index.js";
import { router as mediaRouter } from "../media/routes/index.js";
import { router as notificationRouter } from "../notification/routes/index.js";

const router = Router();

router.use(rateLimit(rateLimitOptions));

const BASE_URL = "/api/v1" as const;

router.use(`${BASE_URL}/auth`, authRouter);
router.use(`${BASE_URL}/users`, userRouter);
router.use(`${BASE_URL}/tweets`, tweetRouter);
router.use(`${BASE_URL}/media`, mediaRouter);
router.use(`${BASE_URL}/notifications`, notificationRouter);

export { router };
