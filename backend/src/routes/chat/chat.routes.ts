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
            data: ["1", "2", "3"],
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
