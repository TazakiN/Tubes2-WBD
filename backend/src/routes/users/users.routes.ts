import { createRoute, z } from "@hono/zod-openapi";
import { getAllUsersResponseSchema } from "./users.schema";
import { errorSchema } from "../schema/error.schema";

export const getAllUsers = createRoute({
  method: "get",
  path: "/",
  summary: "Get all users",
  tags: ["users"],
  request: {
    query: z.object({
      query: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Success get all users",
      content: {
        "application/json": {
          schema: getAllUsersResponseSchema,
          example: {
            success: true,
            message: "Success get all users",
            user_count: 2,
            data: [
              {
                user_id: "1",
                full_name: "user1",
                profile_photo_path: "profile_photo_path",
                status: "Connected",
              },
              {
                user_id: "2",
                full_name: "user2",
                profile_photo_path: "profile_photo_path",
                status: "Not Connected",
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
