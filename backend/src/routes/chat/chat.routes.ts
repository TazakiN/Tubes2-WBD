import { createRoute } from "@hono/zod-openapi";
import {
  GetChatInterlocutorsHistoryResponseSchema,
  GetChatInterlocutorsHistoryErrorResponseSchema,
  GetChatConversationQuerySchema,
  GetChatConversationResponseSchema,
  GetChatConversationErrorResponseSchema,
  SearchConnectedUsersQuerySchema,
  SearchConnectedUsersResponseSchema,
  SearchConnectedUsersErrorResponseSchema,
} from "./chat.schema";

export const getChatInterlocutorsHistory = createRoute({
  method: "get",
  path: "/chat-interlocutors-history",
  summary: "Get chat interlocutors history",
  tags: ["chat"],
  responses: {
    200: {
      description: "Success get chat interlocutors history",
      content: {
        "application/json": {
          schema: GetChatInterlocutorsHistoryResponseSchema,
          example: {
            success: true,
            message: "Success get chat interlocutors history",
            data: [
              {
                interlocutor_id: "1",
                profile_photo_path: "https://example.com/profile.jpg",
                username: "example",
                last_message: {
                  message: "Hello",
                  timestamp: "2021-09-01T00:00:00.000Z",
                },
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
          schema: GetChatInterlocutorsHistoryErrorResponseSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const getChatConversation = createRoute({
  method: "get",
  path: "/conversation",
  summary: "Get chat conversation",
  tags: ["chat"],
  request: {
    query: GetChatConversationQuerySchema,
  },
  responses: {
    200: {
      description: "Success get chat conversation",
      content: {
        "application/json": {
          schema: GetChatConversationResponseSchema,
          example: {
            success: true,
            message: "Success get chat conversation",
            data: [
              {
                id: "1",
                from_id: "1",
                to_id: "2",
                message: "Hello",
                timestamp: "2021-09-01T00:00:00.000Z",
              },
            ],
          },
        },
      },
    },
    400: {
      description: "Interlocutor ID is required",
      content: {
        "application/json": {
          schema: GetChatConversationErrorResponseSchema,
          example: {
            success: false,
            message: "Interlocutor ID is required",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: GetChatConversationErrorResponseSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});

export const searchConnectedUsers = createRoute({
  method: "get",
  path: "/search-connected-users",
  summary: "Search connected users",
  tags: ["chat"],
  request: {
    query: SearchConnectedUsersQuerySchema,
  },
  responses: {
    200: {
      description: "Success search connected users",
      content: {
        "application/json": {
          schema: SearchConnectedUsersResponseSchema,
          example: {
            success: true,
            message: "Success search connected users",
            data: [
              {
                user_id: "1",
                profile_photo_path: "https://example.com/profile.jpg",
                username: "example",
                email: "user@example.com",
              },
            ],
          },
        },
      },
    },
    400: {
      description: "Query is required",
      content: {
        "application/json": {
          schema: SearchConnectedUsersErrorResponseSchema,
          example: {
            success: false,
            message: "Query is required",
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: SearchConnectedUsersErrorResponseSchema,
          example: {
            success: false,
            message: "Internal server error",
          },
        },
      },
    },
  },
});
