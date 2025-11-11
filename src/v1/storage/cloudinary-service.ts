import { StorageError } from "@/lib/errors/storage-error.js";
import {
  cloudinary,
  type TransformationOptions,
  type UploadApiOptions,
  type AdminApiOptions,
  type UploadApiErrorResponse,
  type ResourceType,
  type DeliveryType,
  type ConfigAndUrlOptions,
} from "v1/lib/cloudinary.js";

export const getMediaUrl = (
  filePath: string,
  option?: TransformationOptions | ConfigAndUrlOptions
) => cloudinary.url(filePath, option);

export const getUsage = async () => cloudinary.api.usage();

export const uploadMedia = async (
  folder: string,
  mediaPath: string,
  options?: UploadApiOptions
) => {
  try {
    const response = await cloudinary.uploader.upload(mediaPath, {
      folder,
      ...options,
    });

    return response;
  } catch (error) {
    const err = error as UploadApiErrorResponse;

    throw new StorageError(
      err.message ?? err["error"]?.message ?? "Something went wrong",
      err.http_code ?? err["error"]?.http_code ?? 500
    );
  }
};

export const deleteFolder = async (path: string, options?: AdminApiOptions) => {
  try {
    await cloudinary.api.delete_resources_by_prefix(path);

    const response = await cloudinary.api.delete_folder(path, options);

    return response;
  } catch (error) {
    const err = error as UploadApiErrorResponse;

    throw new StorageError(
      err.message ?? err["error"]?.message ?? "Something went wrong",
      err.http_code ?? err["error"]?.http_code ?? 500
    );
  }
};

export const deleteMedia = async (
  filePath: string,
  options: {
    resource_type?: ResourceType;
    type?: DeliveryType;
    invalidate?: boolean;
  } = { invalidate: true }
) => {
  try {
    const res = await cloudinary.uploader.destroy(filePath, options);

    return res;
  } catch (error) {
    const err = error as UploadApiErrorResponse;

    throw new StorageError(
      err.message ?? err["error"]?.message ?? "Something went wrong",
      err.http_code ?? err["error"]?.http_code ?? 500
    );
  }
};

export const deleteMediaByUploaderId = async (
  uploaderId: string,
  options: {
    resource_type?: ResourceType;
    type?: DeliveryType;
    invalidate?: boolean;
  } = { invalidate: true }
) => {
  try {
    const res = await cloudinary.api.delete_resources_by_tag(uploaderId, options);

    return res;
  } catch (error) {
    const err = error as UploadApiErrorResponse;

    throw new StorageError(
      err.message ?? err["error"]?.message ?? "Something went wrong",
      err.http_code ?? err["error"]?.http_code ?? 500
    );
  }
};
