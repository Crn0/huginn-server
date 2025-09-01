import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  experimental: {
    adapter: true,
    externalTables: true,
    studio: true,
  },
  
  schema: path.join("prisma", "models"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  typedSql: {
    path: path.join("src", "db", "sql"),
  },
});
