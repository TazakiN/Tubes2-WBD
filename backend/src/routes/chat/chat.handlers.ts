import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ChatService } from "../../services/chat.service";

export const getChatInterlocutorsHistory = async (c: Context) => {
  try {
    const userId = await getUserIDbyTokenInCookie(c);
    const data = await ChatService.getChatInterlocutorsHistory(BigInt(userId));
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
    const data = await ChatService.getChatConversation(
      BigInt(userId),
      BigInt(interlocutorId)
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

export const searchConnectedUsers = async (c: Context) => {
  try {
    const username = c.req.query("username");
    if (!username) {
      return c.json(
        {
          success: false,
          message: "Username is required",
        },
        400
      );
    }
    const data = await ChatService.searchConnectedUsers(username);

    return c.json(
      {
        success: true,
        message: "Success search connected users",
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
