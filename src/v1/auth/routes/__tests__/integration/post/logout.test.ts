import { describe, expect, it } from "vitest";
import request from "supertest";

import { generateEmail } from "@/v1/lib/generate-email.js";
import { verifyToken } from "@/v1/lib/jwt.js";
import { getBlackListedTokenByJwtId } from "@/v1/black-listed-token/repository/black-listed-token.js";
import { app } from "v1/__mocks__/server.js";

import type { JwtPayload } from "jsonwebtoken";

const userRequest = request.agent(app);

describe("POST /api/v1/auth/login", () => {
  const url = "/api/v1/auth/login" as const;

  const form = {
    email: generateEmail(),
    displayName: "crno",
    password: "Crnocrno123",
    birthday: "1999-04-25",
  } as const;

  it("black list the refresh token and clear the refresh token cookie", async () => {
    await userRequest.post("/api/v1/auth/register").send(form);
    await userRequest.post("/api/v1/auth/login").send(form);

    const oldRefreshTokenCookie = userRequest.options(url).cookies;

    const res = await userRequest.post(url).send(form);

    const cookies = res.headers["set-cookie"] as string[] | undefined;

    const newRefreshTokenCookie = cookies?.[0];

    expect(newRefreshTokenCookie).not.toBe(oldRefreshTokenCookie);

    const refreshToken = oldRefreshTokenCookie.split('=')[1] as string

    const blacklistedToken = verifyToken(refreshToken) as JwtPayload;

    await expect(
      getBlackListedTokenByJwtId(blacklistedToken.jti as string)
    ).resolves.not.toBeNull();
  });
});
