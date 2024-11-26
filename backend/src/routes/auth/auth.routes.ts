import { createRoute, z } from "@hono/zod-openapi";
import { loginSchema, logoutSchema, registerSchema } from "./auth.schema";

export const login = createRoute({
  method: "post",
  path: "/login",
  summary: "Login",
  description: "Login to the application",
  tags: ["auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            token: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Login failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
  },
});

export const register = createRoute({
  method: "post",
  path: "/register",
  summary: "Register",
  description: "Register a new user",
  tags: ["auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Registration successful",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            token: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Registration failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
  },
});

export const logout = createRoute({
  method: "post",
  path: "/logout",
  summary: "Logout",
  description: "Logout from the application",
  tags: ["auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: logoutSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Logout successful",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: "Logout failed",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
