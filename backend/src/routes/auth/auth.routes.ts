import { createRoute, z } from "@hono/zod-openapi";
import { loginSchema, logoutSchema, registerSchema } from "./auth.schema";

export const login = createRoute({
  method: "post",
  path: "/login",
  summary: "User Login",
  description: "Authenticate a user and generate an access token",
  tags: ["Authentication"],
  request: {
    body: {
      description: "User credentials for login",
      content: {
        "application/json": {
          schema: loginSchema,
          example: {
            identifier: "user@example.com",
            password: "securePassword123",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Successful login with authentication token",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            token: z
              .string()
              .describe("JWT access token for authenticated sessions"),
          }),
          example: {
            success: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
    401: {
      description: "Bad Request - Invalid login credentials",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Detailed error message"),
          }),
          example: {
            success: false,
            message: "Invalid email or password",
          },
        },
      },
    },
    500: {
      description: "Internal Server Error - Login process failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Server-side error description"),
          }),
          example: {
            success: false,
            message: "An unexpected error occurred during login",
          },
        },
      },
    },
  },
});

export const register = createRoute({
  method: "post",
  path: "/register",
  summary: "User Registration",
  description: "Create a new user account and generate an access token",
  tags: ["Authentication"],
  request: {
    body: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: registerSchema,
          example: {
            username: "newuser",
            email: "newuser@example.com",
            password: "strongPassword456",
            confirmPassword: "strongPassword456",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Successful user registration with authentication token",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            token: z.string().describe("JWT access token for new user"),
          }),
          example: {
            success: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
    409: {
      description: "Bad Request - Registration validation failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Validation error details"),
          }),
          example: {
            success: false,
            message:
              "Email already exists or password does not meet requirements",
          },
        },
      },
    },
    500: {
      description: "Internal Server Error - Registration process failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Server-side error description"),
          }),
          example: {
            success: false,
            message: "An error occured on the server during Registration",
          },
        },
      },
    },
  },
});

export const logout = createRoute({
  method: "post",
  path: "/logout",
  summary: "User Logout",
  description:
    "Terminate the current user session and invalidate the access token",
  tags: ["Authentication"],
  request: {
    body: {
      description: "Logout request details",
      content: {
        "application/json": {
          schema: logoutSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Successful logout - Session terminated",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Logout confirmation message"),
          }),
          example: {
            success: true,
            message: "Logout successful",
          },
        },
      },
    },
    500: {
      description: "Internal Server Error - Logout process failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string().describe("Server-side error description"),
          }),
          example: {
            success: false,
            message: "An unexpected error occurred during logout",
          },
        },
      },
    },
  },
});
