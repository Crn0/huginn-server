import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as tweetPost } from "./post.js";

const router = Router();

router.use(readAccessToken);

tweetPost(router);

export { router };
