import { createRoute } from "@hono/zod-openapi";
import {
  AcceptConnectionRequestSchema,
  AcceptConnectionResponseErrorSchema,
  AcceptConnectionResponseSchema,
  ConnectionRequestErrorResponseSchema,
  connectionRequestParamsSchema,
  ConnectionRequestResponseSchema,
  CreateConnectionRequestSchema,
  CreateCOnnectionResponseErrorSchema,
  CreateConnectionResponseSchema,
  RejectConnectionRequestSchema,
  RejectConnectionResponseErrorSchema,
  RejectConnectionResponseSchema,
} from "./connection_request.schema";

export const getAllConnectionRequests = createRoute({
  method: "get",
  path: "/",
  summary: "Get all connection requests",
  description: "Get all connection requests",
  tags: ["Connection Request"],
  request: {
    query: connectionRequestParamsSchema,
  },
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
                user_id: "2",
                username: "user2",
                profile_photo_path: "profile_photo_path2",
                created_at: "2021-09-07T07:00:00.000Z",
              },
              {
                user_id: "3",
                username: "user3",
                profile_photo_path: "profile_photo_path3",
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

export const createConnectionRequest = createRoute({
  method: "post",
  path: "/",
  summary: "Create a connection request",
  description: "Create a connection request",
  tags: ["Connection Request"],
  request: {
    body: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: CreateConnectionRequestSchema,
          example: {
            from_id: "1",
            to_id: "2",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success create a connection request",
      content: {
        "application/json": {
          schema: CreateConnectionResponseSchema,
          example: {
            success: true,
            message: "Success create a connection request",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: CreateCOnnectionResponseErrorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const acceptConnectionRequest = createRoute({
  method: "post",
  path: "/accept",
  summary: "Accept a connection request",
  description: "Accept a connection request",
  tags: ["Connection Request"],
  request: {
    body: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: AcceptConnectionRequestSchema,
          example: {
            from_id: "2",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success accept a connection request",
      content: {
        "application/json": {
          schema: AcceptConnectionResponseSchema,
          example: {
            success: true,
            message: "Success accept a connection request",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: AcceptConnectionResponseErrorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const rejectConnectionRequest = createRoute({
  method: "post",
  path: "/reject",
  summary: "Reject a connection request",
  description: "Reject a connection request",
  tags: ["Connection Request"],
  request: {
    body: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: RejectConnectionRequestSchema,
          example: {
            from_id: "2",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success reject a connection request",
      content: {
        "application/json": {
          schema: RejectConnectionResponseSchema,
          example: {
            success: true,
            message: "Success reject a connection request",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: RejectConnectionResponseErrorSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
