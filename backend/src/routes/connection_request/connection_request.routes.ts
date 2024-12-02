import { createRoute } from "@hono/zod-openapi";
import {
  ConnectionRequestErrorResponseSchema,
  connectionRequestParamsSchema,
  ConnectionRequestResponseSchema,
} from "./connection_request.schema";

export const getAllConnectionRequests = createRoute({
  method: "get",
  path: "/",
  summary: "Get all connection requests",
  description: "Get all connection requests",
  tags: ["Connection Request"],
  // request: {
  //   params: connectionRequestParamsSchema,
  // },
  responses: {
    200: {
      description: "Success get all connection requests",
      content: {
        "application/json": {
          schema: ConnectionRequestResponseSchema,
          example: {
            success: true,
            message: "Success get all connection requests",
            data: [
              {
                user_id: "1",
                created_at: "2021-09-01T00:00:00.000Z",
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
          schema: ConnectionRequestErrorResponseSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
