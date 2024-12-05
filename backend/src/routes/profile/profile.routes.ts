import { createRoute, z } from "@hono/zod-openapi";
import {
  GetProfileInfoResponse,
  GetPrivateProfileResponse,
  GetPublicProfileResponse,
  GetProfileInfoRequest,
} from "./profile.schema";
import { errorPayloadSchema } from "../schema/error.schema";

export const getProfileInfo = createRoute({
  method: "get",
  path: "/info",
  summary: "Get Profile Information for Navbar",
  tags: ["profile"],
  request: {
    params: GetProfileInfoRequest,
  },
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
                username: "KSI",
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
          schema: errorPayloadSchema,
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
  parameters: [
    {
      name: "user_id",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  tags: ["profile"],
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
                profile_photo_path:
                  "/src/frontend/src/assets/img/default-profile-picture.png",
                name: "JJ Olantunji",
                work_history:
                  "From the Screen, to the ring, to the pen, to a king",
                skills: "Awful Rapping",
                connection_count: 3,
                relevant_posts: [],
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
          schema: errorPayloadSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
