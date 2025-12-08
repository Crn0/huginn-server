import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { register as notificationPost } from "./post.js";

const router = Router();

router.use(readAccessToken);

router.use(protectedRoute);

notificationPost(router);

export { router };
