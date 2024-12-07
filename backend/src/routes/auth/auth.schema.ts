import { z } from "@hono/zod-openapi";

export const registerSchema = z
  .object({
    username: z.string().openapi({ description: "The username of the user" }),
    email: z
      .string()
      .email({ message: "Invalid email" })
      .openapi({ description: "The email address of the user" }),
    name: z
      .string()
      .optional()
      .openapi({ description: "The full name of the user" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .openapi({ description: "The password of the user" }),
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
