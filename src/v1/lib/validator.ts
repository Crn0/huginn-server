import z from "zod";

import { ValidationError } from "@/lib/errors/validation-error.js";

import type { Request, Response, NextFunction } from "express";
import { unlink } from "fs/promises";

type RequestWithQuery<T extends z.ZodType> = Request<never, never, never, z.infer<T>>;

type RequestWithParams<T extends z.ZodType> = Request<z.infer<T>, never, never, never>;

const normalizedFiles = <T>(files: T) => {
  if (Array.isArray(files)) {
    return files.filter(Boolean);
  }

  if (files && typeof files === "object") {
    return Object.entries(files)
      .flatMap(([_key, file]) => file)
      .filter(Boolean);
  }

  return [];
};

const cleanUpTempMedias = async (req: Request) => {
  const reqFiles = normalizedFiles(req.files);

  if (req.file) {
    reqFiles.push(req.file);
  }

  await Promise.all(reqFiles.map((file) => unlink(file.path)));
};

export const ZodBodyValidator =
  <T extends z.ZodType>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (err) {
      let message = "Validation Failed";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      cleanUpTempMedias(req).catch(console.error);

      next(validationError);
    }
  };

export const ZodQueryValidator =
  <T extends z.ZodType>(schema: T) =>
  (req: RequestWithQuery<T>, _res: Response, next: NextFunction) => {
    try {
      _res.locals["query"] = schema.parse(req.query);
      next();
    } catch (err) {
      let message = "Validation Failed";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      next(validationError);
    }
  };

export const ZodParamValidation =
  <T extends z.ZodType>(schema: T) =>
  (req: RequestWithParams<T>, _res: Response, next: NextFunction) => {
    try {
      req.params = z.parse(schema, req.params);
      next();
    } catch (err) {
      let message = "Query Format Error";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      next(validationError);
    }
  };
