import multer, { MulterError, type FileFilterCallback, type Options } from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@/lib/errors/validation-error.js";

import type { Request } from "express";

type FileType = `${string}` | `${string}|`;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

interface MulterOptions extends Options {
  /**
   * Path to the temporary directory where files will be stored.
   */
  path: string;

  /**
   * Supported file extensions as a pipe (`|`)-separated string.
   *
   * @remarks
   * Valid examples include:
   * - "png"
   * - "png|jpeg"
   * - "png|jpeg|"
   */
  fileType?: FileType;
}

const fileExtension = (mimeType: string) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
    case "image/jpg":
      return ".jpeg";
    case "image/webp":
      return ".webp";
    case "application/pdf":
      return ".pdf";
    case "application/epub+zip":
      return ".epub";
    default:
      return "";
  }
};

const fileFilter =
  (fileType?: FileType) => (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (typeof fileType === "undefined") return cb(null, true);

    // Check ext
    const regex = new RegExp(fileType);

    const ext = regex.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = regex.test(file.mimetype);

    if (mimetype && ext) {
      return cb(null, true);
    }

    return cb(
      new ValidationError("Validation Error", [
        {
          code: "custom",
          message: `Only ${fileType} formats are supported.`,
          path: [`${file.fieldname}`],
        },
      ])
    );
  };

const storage = {
  destination:
    (path: string) => (_req: Request, _file: Express.Multer.File, cb: DestinationCallback) =>
      cb(null, path),
  filename: (_req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    const name = `${file.fieldname}-${uuidv4()}${fileExtension(file.mimetype)}`;
    return cb(null, name);
  },
};

export const initMulter = ({ path, limits, fileType }: MulterOptions) => ({
  uploader: multer({
    limits,
    storage: multer.diskStorage({
      filename: storage.filename,
      destination: storage.destination(path),
    }),
    fileFilter: fileFilter(fileType),
  }),
  MulterError,
});
