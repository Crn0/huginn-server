import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { generateId } from "@/v1/lib/generate-id.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { createTweet } from "@/v1/tweet/service/tweet.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { deleteTweetById } from "@/v1/tweet/repository/tweet.js";
import { app } from "v1/__mocks__/server.js";
import { tweetSchema } from "@/v1/tweet/schema/tweet.js";

let accessToken: string;
let tweetId: string;

const userRequest = request.agent(app);

beforeAll(async () => {
  const form = {
    email: "gettweet.get@gettweet.com",
    displayName: "get.data.tweet",
    password: "Crnocrno123",
    birthday: new Date(),
  } as const;

  const user = await createUser(form);
  const login = await userRequest.post("/api/v1/auth/login").send(form);

  const tweet = await createTweet({ content: "get tweet by ID", authorId: user.id, media: [] });

  accessToken = login.body.token;

  tweetId = tweet.id;

  return async () => {
    await deleteTweetById(tweet.id);
    await deleteUserById(user.id);
  };
});

describe("GET /api/v1/tweets/:tweetId", () => {
  const baseUrl = "/api/v1/tweets" as const;

  describe("Success cases", () => {
    it("returns a tweet object", async () => {
      const url = `${baseUrl}/${tweetId}` as const;

      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(tweetSchema.safeParse(res.body).success).toBe(true);
    });
  });

  describe("Failure cases", () => {
    describe("Not_Found errors", () => {
      it("returns a not_found error when the tweetId is invalid", async () => {
        const url = `${baseUrl}/${generateId()}` as const;

        const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ message: "Tweet not found." });
      });
    });
    describe("Validation errors", () => {
      it("returns a Validation error when the tweetId is invalid", async () => {
        const url = `${baseUrl}/invalid-tweet-id` as const;

        const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

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
