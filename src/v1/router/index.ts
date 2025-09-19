import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { rateLimitOptions } from "../configs/rate-limiter.js";
import { router as authRouter } from "../auth/routes/index.js";
import { router as userRouter } from "../user/routes/index.js";
import { router as tweetRouter } from "../tweet/routes/index.js";

const router = Router();

router.use(rateLimit(rateLimitOptions));

const BASE_URL = "/api/v1"

router.use(`${BASE_URL}/auth`, authRouter);
router.use(`${BASE_URL}/users`, userRouter);
router.use(`${BASE_URL}/tweets`, tweetRouter)

export { router };
