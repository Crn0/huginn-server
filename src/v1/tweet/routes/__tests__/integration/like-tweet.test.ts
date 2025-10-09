import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { createUser } from "@/v1/user/service/user-service.js";
import { createTweet } from "@/v1/tweet/service/tweet.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { deleteTweetsByAuthorId } from "@/v1/tweet/repository/tweet.js";
import { app } from "v1/__mocks__/server.js";
import { generateId } from "@/v1/lib/generate-id.js";

let accessToken: string;
let tweetId: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const form = {
    email: "getlikes.post@getlikes.com",
    displayName: "get.likes",
    password: "Crnocrno123",
    birthday: new Date(),
  } as const;

  const user = await createUser(form);
  const [login, tweet] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(form),
    createTweet({ content: "like_tweet", authorId: user.id, media: [] }),
  ]);

  accessToken = login.body.token;
  tweetId = tweet.id;

  return async () => {
    await deleteTweetsByAuthorId(user.id);
    await deleteUserById(user.id);
  };
});

describe("POST /api/v1/tweets", () => {
  const baseUrl = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    it("returns a status code 204 on like", async () => {
      const url = `${baseUrl}/${tweetId}/likes` as const;

      const res = await userRequest.post(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not_found error when the tweet does not exist", async () => {
        const url = `${baseUrl}/${generateId()}/likes` as const;

        const res = await userRequest.post(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ code: "NOT_FOUND", message: "Tweet not found." });
      });
    });

    describe("Validation errors", () => {
      it("returns a Validation error when the tweetId is invalid", async () => {
        const url = `${baseUrl}/invalid-tweet-id/likes` as const;

        const res = await userRequest.post(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "invalid_format",
              format: "uuid",
              pattern:
                "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
              path: ["tweetId"],
              message: "Invalid tweet ID",
            },
          ],
        });
      });
    });
  });
});

describe("DELETE /api/v1/tweets", () => {
  const baseUrl = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    it("returns a status code 204 on unlike", async () => {
      const url = `${baseUrl}/${tweetId}/likes` as const;

      const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not_found error when there's no like to delete", async () => {
        const url = `${baseUrl}/${tweetId}/likes` as const;

        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({
          code: "NOT_FOUND",
          message: "You haven't liked this tweet.",
        });
      });
    });

    describe("Validation errors", () => {
      it("returns a Validation error when the tweetId is invalid", async () => {
        const url = `${baseUrl}/invalid-tweet-id/likes` as const;

        const res = await userRequest.delete(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
          code: "VALIDATION_ERROR",
          message: "Validation failed: 1 errors detected in body",
          issues: [
            {
              origin: "string",
              code: "invalid_format",
              format: "uuid",
              pattern:
                "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
              path: ["tweetId"],
              message: "Invalid tweet ID",
            },
          ],
        });
      });
    });
  });
});
