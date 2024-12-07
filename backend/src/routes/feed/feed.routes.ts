import { createRoute } from "@hono/zod-openapi";
import {
  getAllFeedsRequestQuerySchema,
  getAllFeedsResponseSchema,
} from "./feed.schema";

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
              body: [
                {
                  id: "1",
                  content: "Hello World",
                  created_at: "2021-06-01T00:00:00Z",
                  user: {
                    id: "1",
                    full_name: "user1",
                    profile_picture_path: "https://example.com/user1.jpg",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },
});
