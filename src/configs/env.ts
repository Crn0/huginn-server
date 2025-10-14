import "dotenv/config";
import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    NODE_ENV: z.enum(["dev", "prod", "test"]).optional().default("dev"),
    CORS_ORIGINS: z
      .string()
      .transform((origins) => origins.split(","))
      .default(["http://localhost:5173"]),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().catch("secret"),
    TRANSACTION_MAX_TIMEOUT: z.coerce.number().catch(20_000),
    CLIENT_URL: z.string().catch("http://localhost:5173"),
    APP_URL: z.string().optional().default("http://localhost:3000"),
    PORT: z.coerce.number().optional().default(3000),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CALLBACK_URL: z.string().optional(),

    CLOUDINARY_ROOT_FOLDER: z.string().default("dev"),
    CLOUDINARY_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_SECRET: z.string(),
  });

  const envVars = Object.entries(process.env).reduce<Record<string, string | number>>(
    (acc, curr) => {
      const [key, value] = curr;

      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    },
    {}
  );

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(z.treeifyError(parsedEnv.error).properties!)
  .map(([k, v]) => `- ${k}: ${v.errors.join(",")}`)
  .join("\n")}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
