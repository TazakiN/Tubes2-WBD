import { createRoute } from "@hono/zod-openapi";
import {
  DeleteConnectionRequestSchema,
  DeleteConnectionResponseSchema,
  GetAllConnectResponseErrorSchema,
  GetAllConnectResponseSchema,
} from "./connection.schema";
import { errorSchema } from "../schema/error.schema";

export const getAllConnection = createRoute({
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

export const deleteConnection = createRoute({
  method: "delete",
  path: "/",
  summary: "Delete connection",
  description: "Delete connection",
  tags: ["Connect"],
  request: {
    body: {
      description: "Delete connection",
      content: {
        "application/json": {
          schema: DeleteConnectionRequestSchema,
          example: {
            to_id: "1",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success delete connection",
      content: {
        "application/json": {
          schema: DeleteConnectionResponseSchema,
          example: {
            success: true,
            message: "Success delete connection",
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
