import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as meRoute } from "./me/index.js";
import { register as userIdRoute } from "./[userId]/index.js";

const router = Router();

router.use(readAccessToken);

meRoute(router);

userIdRoute(router);

export { router };
