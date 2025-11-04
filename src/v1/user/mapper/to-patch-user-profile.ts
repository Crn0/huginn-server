import type { Prisma } from "@/generated/prisma/index.js";
import type { PatchUserProfile, UserProfileMedia } from "../types/repository.types.js";

type dataField = "displayName" | "bio" | "birthday" | "location" | "website" | "avatar" | "banner";
type MappedData = Pick<Prisma.UserProfileUpdateArgs["data"], dataField>;

const upsertProfileMedia = (media: UserProfileMedia) =>
  Object.freeze({
    upsert: {
      where: {
        id: media.id,
      },
      update: {
        filePath: media.filePath,
        url: media.url,
        type: media.type,
        bytes: media.bytes,
      },
      create: {
        id: media.id,
        filePath: media.filePath,
        url: media.url,
        type: media.type,
        bytes: media.bytes,
      },
    },
  });

const setData = <TData extends object, TKey extends keyof TData = keyof TData>(
  data: TData,
  key: TKey,
  value: TData[TKey]
) => {
  data[key] = value;
};

export const toPatchUserProfile = ({
  displayName,
  bio,
  birthday,
  location,
  website,
  avatar,
  banner,
}: PatchUserProfile) => {
  const data: MappedData = {
    bio: bio ?? null,
    location: location ?? null,
    website: website ?? null,
  };

  if (displayName) {
    setData(data, "displayName", displayName);
  }

  if (birthday) {
    setData(data, "birthday", birthday);
  }

  if (avatar) {
    setData(data, "avatar", upsertProfileMedia(avatar));
  }

  if (banner) {
    setData(data, "banner", upsertProfileMedia(banner));
  }

  return Object.freeze(data);
};
