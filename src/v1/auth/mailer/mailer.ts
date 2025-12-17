import path from "node:path";
import hbs from "nodemailer-express-handlebars";

import { env } from "@/configs/env.js";

import { transporter } from "./transporter.js";

import type { Options } from "nodemailer/lib/mailer/index.js";
import type { User } from "@/generated/prisma/index.js";

type ExtendedOptions = Options & { template: string; context: Record<string, unknown> };

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve(import.meta.dirname, "./view/"),
    defaultLayout: false,
  },
  viewPath: path.resolve(import.meta.dirname, "./view/"),
  extName: ".hbs",
} satisfies hbs.NodemailerExpressHandlebarsOptions;

transporter.use("compile", hbs(handlebarOptions));

export const sendMailPasswordReset = (user: User, token: string) =>
  transporter.sendMail({
    template: "password-reset",
    from: env.GOOGLE_GMAIL,
    to: user.email,
    subject: "Password Reset Request",
    context: {
      username: user.username,
      redirectTo: `${env.CLIENT_URL}/reset-password/${token}`,
    },
    attachments: [
      {
        filename: "logo.png",
        path: path.resolve(import.meta.dirname, "asset", "logo.png"),
        cid: "huginnLogo",
      },
    ],
  } as ExtendedOptions);
