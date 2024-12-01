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
