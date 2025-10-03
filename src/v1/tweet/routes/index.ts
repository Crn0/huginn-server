import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { protectedRoute } from "@/v1/auth/middleware/protected-route.js";
import { register as tweetPost } from "./post.js";
import { register as tweetPatch } from "./patch.js";
import { register as tweetDelete } from "./delete.js";
import { register as tweetGet } from './get.js'

const router = Router();

router.use(readAccessToken);

tweetGet(router);

router.use(protectedRoute)

tweetPost(router);

tweetPatch(router);

tweetDelete(router);

export { router };
