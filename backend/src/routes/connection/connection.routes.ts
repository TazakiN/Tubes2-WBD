import { createRoute } from "@hono/zod-openapi";
import {
  GetAllConnectResponseErrorSchema,
  GetAllConnectResponseSchema,
} from "./connection.schema";

export const getAllConnect = createRoute({
  method: "get",
  path: "/",
  summary: "Get all connect",
  description: "Get all connect",
  tags: ["Connect"],
  responses: {
    200: {
      description: "Success get all connect",
      content: {
        "application/json": {
          schema: GetAllConnectResponseSchema,
          example: {
            success: true,
            message: "Success get all connect",
            data: [
              {
                from_id: "2",
                to_id: "1",
                created_at: "2021-09-07T07:00:00.000Z",
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
          schema: GetAllConnectResponseErrorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
