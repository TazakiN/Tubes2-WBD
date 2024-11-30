import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ChatController } from "../../controllers/chat.controller";

export const getChatInterlocutorsHistory = async (c: Context) => {
  try {
    const userId = getUserIDbyTokenInCookie(c);
    const chated_id = await ChatController.getChatInterlocutorsHistory(userId);
    return c.json(
      {
        success: true,
        message: "Success get chat interlocutors history",
        data: chated_id,
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
