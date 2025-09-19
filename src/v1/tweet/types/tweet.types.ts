import type { SupportedFile } from "../constants/index.js";

export type TweetMedia = Express.Multer.File & {
  mimetype: SupportedFile;
};
