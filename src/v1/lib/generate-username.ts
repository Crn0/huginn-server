import { faker } from "@faker-js/faker";

import { usernameRegex } from "./user-schema.js";
import { generateId } from "./generate-id.js";

export const generateUsername = (firstName: string, lastName?: string) => {
  const maxAttempts = 20;
  let username = faker.internet.username({ firstName, lastName: lastName ?? "" });
  let attempt = 0;

  while (attempt < maxAttempts) {
    if (usernameRegex.test(username)) return username;

    username = faker.internet.username({ firstName, lastName: lastName ?? "" });

    attempt += 1;
  }

  return `user.${generateId()}`;
};
