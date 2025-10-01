import path from "node:path";

import { createUser, getUserByEmail } from "@/v1/user/service/user-service.js";
import { createMedia } from "@/v1/media/repository/media.js";
import { createTweet } from "@/v1/tweet/repository/tweet.js";

export const testUserLoginForm = { email: "crno@gmail.com", password: "Crnocrno123" } as const;

export const testDeleteUserLoginForm = { email: "jojo@gmail.com", password: "Crnocrno123" };

export const testUserGetMediaLoginForm = { email: "test@get.media", password: "Crnocrno123" };

export const seedTestUser = async () => {
  await Promise.all([
    createUser({
      email: "crno@gmail.com",
      displayName: ".crno.",
      birthday: new Date("1990-04-25"),
      password: "Crnocrno123",
    }),
    createUser({
      email: testDeleteUserLoginForm.email,
      displayName: ".crno.",
      birthday: new Date("1990-04-25"),
      password: testDeleteUserLoginForm.password,
    }),
    createUser({
      email: testUserGetMediaLoginForm.email,
      displayName: ".krno.",
      birthday: new Date("1990-04-25"),
      password: testUserGetMediaLoginForm.password,
    }),
  ]);
};

export const seedUserMedia = async () => {
  const filePath = path.join(import.meta.dirname, "..", "src", "v1", "assets", "test_avatar.png");

  const uploader = await getUserByEmail(testUserGetMediaLoginForm.email);

  const mediaFiles = Array.from({ length: 40 }).map(
    () =>
      ({
        filePath,
        url: "http://example.com",
        type: "IMAGE",
        bytes: 20_000,
      }) as const
  );

  const media = await createMedia(mediaFiles, { uploaderId: uploader!.id });

  await createTweet({ content: "test get media", authorId: uploader!.id, media: media });
};
