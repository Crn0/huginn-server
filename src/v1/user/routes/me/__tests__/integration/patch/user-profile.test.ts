import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { env } from "@/configs/env.js";
import { testUserLoginForm } from "testing/seed.js";
import { deleteFolder } from "@/v1/storage/cloudinary-service.js";
import { app } from "v1/__mocks__/server.js";
import { getUserByEmail } from "@/v1/user/service/user-service.js";
import path from "node:path";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const login = await userRequest.post("/api/v1/auth/login").send(testUserLoginForm);

  accessToken = login.body.token;

  return async () => {
    const user = await getUserByEmail(testUserLoginForm.email);

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/avatars/${user?.id}`;

    await deleteFolder(mediaFolder);
  };
});

describe("PATCH /api/v1/users/me/profile", () => {
  const url = "/api/v1/users/me/profile" as const;

  const testFile = path.join(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "assets",
    "test_avatar.png"
  );

  const form = {
    displayName: "krno.Krno",
    bio: "hello world",
    birthday: new Date(),
    location: "foo land",
    website: "https://example.com",
  } as const;

  describe("Success cases", () => {
    const checkFieldUpdate =
      <K extends keyof typeof form>(field: K, expected: (typeof form)[K]) =>
      async () => {
        const user = await getUserByEmail(testUserLoginForm.email);

        if (!user || !user.profile) return false;

        if (field === "birthday") {
          return user.profile.birthday?.toDateString() === (expected as Date).toDateString();
        }

        return user.profile[field] === expected;
      };

    const scenarios = [
      {
        field: "displayName",
        payload: { displayName: form.displayName },
        responseBody: { id: expect.any(String), username: expect.any(String) },
        isFieldUpdated: checkFieldUpdate("displayName", form.displayName),
      },
      {
        field: "bio",
        payload: { bio: form.bio },
        responseBody: { id: expect.any(String), username: expect.any(String) },
        isFieldUpdated: checkFieldUpdate("bio", form.bio),
      },
      {
        field: "birthday",
        payload: { birthday: form.birthday },
        responseBody: { id: expect.any(String), username: expect.any(String) },
        isFieldUpdated: checkFieldUpdate("birthday", form.birthday),
      },
      {
        field: "location",
        payload: { location: form.location },
        responseBody: { id: expect.any(String), username: expect.any(String) },
        isFieldUpdated: checkFieldUpdate("location", form.location),
      },
      {
        field: "website",
        payload: { website: form.website },
        responseBody: { id: expect.any(String), username: expect.any(String) },
        isFieldUpdated: checkFieldUpdate("website", form.website),
      },
      {
        field: "avatar",
        payload: { avatar: testFile },
        responseBody: { id: expect.any(String), username: expect.any(String) },
      },
      {
        field: "banner",
        payload: { banner: testFile },
        responseBody: { id: expect.any(String), username: expect.any(String) },
      },
    ] as const;

    it.each(scenarios)(
      "returns an id and username when $field is updated",
      async ({ field, payload, responseBody }) => {
        if (field === "avatar" || field === "banner") {
          const file = field === "avatar" ? payload.avatar : payload.banner;

          const res = await userRequest
            .patch(url)
            .set("Authorization", `Bearer ${accessToken}`)
            .attach(field, file);

          expect(res.status).toBe(200);
          expect(res.body).toMatchObject(responseBody);

          return;
        }

        const res = await userRequest
          .patch(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(responseBody);
      }
    );
  });

  describe.skip("Failure cases", () => {
    describe.skip("Validation errors", () => {});
  });
});
