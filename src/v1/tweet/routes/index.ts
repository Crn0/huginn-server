import "dotenv/config";
import { Router } from "express";

import { readAccessToken } from "@/v1/auth/middleware/read-access-token.js";
import { register as tweetPost } from "./post.js";
import { register as tweetPatch } from "./patch.js";
import { register as tweetDelete } from "./delete.js";

const router = Router();

router.use(readAccessToken);

tweetPost(router);

tweetPatch(router);

tweetDelete(router);

export { router };
