import { createRoute } from "@hono/zod-openapi";
import {
  GetChatInterlocutorsHistoryResponseSchema,
  GetChatInterlocutorsHistoryErrorResponseSchema,
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
