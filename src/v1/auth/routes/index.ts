import "dotenv/config";
import { Router } from "express";
import passport from "passport";

import { createLocalStrategy } from "@/v1/lib/local-strategy.js";
import { createGoogleStrategy } from "@/v1/lib/google-strategy.js";
import { register as authPost } from "./post.js";
import { register as authGet } from "./get.js";

const router = Router();

passport.use(createLocalStrategy());
passport.use(createGoogleStrategy());

authGet(router);
authPost(router);

export { router };
