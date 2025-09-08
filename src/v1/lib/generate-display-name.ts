import { faker } from "@faker-js/faker";

export const generateDisplayName = (firstName: string, lastName?: string) =>
  faker.internet.displayName({ firstName, lastName: lastName ?? "" });
