import { z } from "@hono/zod-openapi";

export const registerSchema = z
  .object({
    username: z.string().openapi({ description: "The username of the user" }),
    email: z
      .string()
      .email()
      .openapi({ description: "The email address of the user" }),
    name: z.string().openapi({ description: "The full name of the user" }),
    password: z.string().openapi({ description: "The password of the user" }),
  })
  .openapi({ description: "Schema for user registration" });

export const loginSchema = z
  .object({
    identifier: z
      .string()
      .openapi({ description: "The username or email of the user" }),
    password: z.string().openapi({ description: "The password of the user" }),
  })
  .openapi({ description: "Schema for user login" });

export const logoutSchema = z
  .object({})
  .openapi({ description: "Schema for user logout" });
