export type SupportedFile =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "video/mp4";

export type MediaFile = Express.Multer.File & {
  mimetype: SupportedFile;
};

export type MediaFiles = MediaFile[];
