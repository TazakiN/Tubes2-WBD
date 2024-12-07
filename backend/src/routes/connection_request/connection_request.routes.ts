import { createRoute } from "@hono/zod-openapi";
import {
  AcceptConnectionRequestSchema,
  AcceptConnectionResponseErrorSchema,
  AcceptConnectionResponseSchema,
  GetAllConnectionRequestErrorResponseSchema,
  GetAllConnectionRequestQuerySchema,
  GetAllConnectionRequestResponseSchema,
  CreateConnectionRequestSchema,
  CreateCOnnectionResponseErrorSchema,
  CreateConnectionResponseSchema,
  RejectConnectionRequestSchema,
  RejectConnectionResponseErrorSchema,
  RejectConnectionResponseSchema,
  GetConnectionRequestResponseSchema,
  GetConnectionRequestResponseErrorSchema,
} from "./connection_request.schema";

export const getAllConnectionRequests = createRoute({
  method: "get",
  path: "/",
  summary: "Get all connection requests",
  description: "Get all connection requests",
  tags: ["Connection Request"],
  request: {
    query: GetAllConnectionRequestQuerySchema,
  },
  responses: {
    200: {
      description: "Success get all connection requests",
      content: {
        "application/json": {
          schema: GetAllConnectionRequestResponseSchema,
          example: {
            success: true,
            message: "Success get all connection requests",
            data: [
              {
                user_id: "2",
                full_name: "user2",
                profile_photo_path: "profile_photo_path2",
                created_at: "2021-09-07T07:00:00.000Z",
              },
              {
                user_id: "3",
                full_name: "user3",
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
          schema: GetAllConnectionRequestErrorResponseSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const getConnectionRequest = createRoute({
  method: "get",
  path: "/:from_id",
  summary: "Get a connection request",
  description: "Get a connection request",
  tags: ["Connection Request"],
  // request: {
  //   params:
  // },
  responses: {
    200: {
      description: "Success get a connection request",
      content: {
        "application/json": {
          schema: GetConnectionRequestResponseSchema,
          example: {
            success: true,
            message: "Success get connection request",
            data: {
              from_id: "2",
              to_id: "1",
              created_at: "2021-09-07T07:00:00.000Z",
            },
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: GetConnectionRequestResponseErrorSchema,
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
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: CreateCOnnectionResponseErrorSchema,
          example: {
            success: false,
            message: "Login first to Connect with others",
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

export const cancelConnectionRequest = createRoute({
  method: "delete",
  path: "/",
  summary: "Cancel a connection request",
  description: "Cancel a connection request",
  tags: ["Connection Request"],
  request: {
    body: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: CreateConnectionRequestSchema,
          example: {
            to_id: "2",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success cancel a connection request",
      content: {
        "application/json": {
          schema: CreateConnectionResponseSchema,
          example: {
            success: true,
            message: "Success cancel a connection request",
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
