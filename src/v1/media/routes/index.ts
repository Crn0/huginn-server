import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as registerGet } from "./get.js";

const router = Router();

router.use(readAccessToken);

registerGet(router)

export { router };
