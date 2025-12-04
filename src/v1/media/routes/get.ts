import { ZodQueryValidator } from "@/v1/lib/validator.js";
import { mediaPaginationSchema } from "../schema/media-pagination.js";
import { getMedia } from "../api/get-media.js";

import type { Router } from "express";

export const register = (router: Router) => {
  router.get("/", ZodQueryValidator(mediaPaginationSchema), getMedia);

  return router;
};
