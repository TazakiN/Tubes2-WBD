import { createRoute } from "@hono/zod-openapi";
import {
  getAllFeedsRequestQuerySchema,
  getAllFeedsResponseSchema,
} from "./feed.schema";
import { errorSchema } from "../schema/error.schema";

export const getAllFeeds = createRoute({
  method: "get",
  path: "/",
  summary: "Get all feeds",
  tags: ["feeds"],
  request: {
    query: getAllFeedsRequestQuerySchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: getAllFeedsResponseSchema,
          example: [
            {
              success: true,
              message: "Success",
              body: {
                cursor: 1,
                feeds: [
                  {
                    id: "1",
                    content: "Hello World",
                    created_at: "2021-06-01T00:00:00Z",
                    updated_at: "2021-06-01T00:00:00Z",
                    user: {
                      user_id: "1",
                      full_name: "user1",
                      profile_photo_path: "https://example.com/user1.jpg",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: errorSchema,
          example: {
            success: false,
            message: "Internal Server Error",
          },
        },
      },
    },
  },
});
