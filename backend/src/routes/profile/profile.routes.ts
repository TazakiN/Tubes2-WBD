import { createRoute, z } from "@hono/zod-openapi";
import {
  GetProfileInfoResponse,
  GetPrivateProfileResponse,
  GetPublicProfileResponse,
  updateProfileSchema,
} from "./profile.schema";
import { errorSchema } from "../schema/error.schema";

export const getProfileInfo = createRoute({
  method: "get",
  path: "/info",
  summary: "Get Profile Information for Navbar",
  tags: ["profile"],
  responses: {
    200: {
      description: "Success get profile information for navbar",
      content: {
        "application/json": {
          schema: GetProfileInfoResponse,
          example: {
            success: true,
            message: "Success get profile information",
            data: [
              {
                id: "1",
                full_name: "KSI",
                profile_photo_path:
                  "/src/frontend/src/assets/img/default-profile-picture.png",
              },
            ],
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const getProfile = createRoute({
  method: "get",
  path: "/:user_id",
  summary:
    "Get User profile from user ID, depends on authentication and connection between current user",
  tags: ["profile"],
  request: {
    params: z.object({
      user_id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Success get user profile for authenticated current user",
      content: {
        "application/json": {
          schema: z.union([
            GetPrivateProfileResponse,
            GetPublicProfileResponse,
          ]),
          example: {
            success: true,
            message: "Authenticated",
            data: [
              {
                username: "KSI",
                name: "KSI",
                work_history: "Software Engineer at Google",
                skills: "React, Node.js, TypeScript",
                connection_count: 0,
                relevant_posts: null,
                profile_photo:
                  "/src/frontend/src/assets/img/default-profile-picture.png",
              },
            ],
          },
        },
      },
    },
    404: {
      description: "Profile not found",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Profile not found",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const updateProfile = createRoute({
  method: "put",
  path: "/edit/:user_id",
  summary: "Update User profile from user ID",
  tags: ["profile"],
  request: {
    params: z.object({
      user_id: z.string(),
    }),
    body: {
      content: {
        "form-data": {
          schema: updateProfileSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: "Profile updated successfully, no content to return",
    },
    400: {
      description: "Invalid request data",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Invalid request data",
          },
        },
      },
    },
    404: {
      description: "Profile not found",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Profile not found",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
