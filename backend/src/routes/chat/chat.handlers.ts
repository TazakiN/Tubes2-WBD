import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ChatController } from "../../controllers/chat.controller";

export const getChatInterlocutorsHistory = async (c: Context) => {
  try {
    const userId = await getUserIDbyTokenInCookie(c);
    const data = await ChatController.getChatInterlocutorsHistory(userId);
    return c.json(
      {
        success: true,
        message: "Success get chat interlocutors history",
        data,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

export const getChatConversation = async (c: Context) => {
  try {
    const userId = await getUserIDbyTokenInCookie(c);
    const interlocutorId = c.req.query("interlocutor_id");
    if (!interlocutorId) {
      return c.json(
        {
          success: false,
          message: "Interlocutor ID is required",
        },
        400
      );
    }
    const data = await ChatController.getChatConversation(
      userId,
      interlocutorId
    );

    return c.json(
      {
        success: true,
        message: "Success get chat conversation",
        data,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};
