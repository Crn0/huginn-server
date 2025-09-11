import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as meRoute } from "./me/index.js";

const router = Router();

router.use(readAccessToken);

meRoute(router);

export { router };
