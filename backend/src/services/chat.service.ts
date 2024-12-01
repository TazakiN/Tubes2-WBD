import db from "../config/db";

export class ChatService {
  static async getChatConversation(user_id_1: bigint, user_id_2: bigint) {
    try {
      const chats = await db.chat.findMany({
        where: {
          OR: [
            { from_id: user_id_1, to_id: user_id_2 },
            { from_id: user_id_2, to_id: user_id_1 },
          ],
        },
        select: {
          id: true,
          from_id: true,
          to_id: true,
          message: true,
          timestamp: true,
        },
      });
      return chats.map((chat) => ({
        ...chat,
        from_id: chat.from_id.toString(),
        to_id: chat.to_id.toString(),
        id: chat.id.toString(),
      }));
    } catch (error) {
      throw error;
    }
  }

  static async getChatInterlocutorsHistory(userId: bigint) {
    try {
      const chats = await db.chat.findMany({
        where: {
          OR: [{ from_id: userId }, { to_id: userId }],
        },
        select: {
          from_id: true,
          to_id: true,
        },
      });

      const interlocutorIds = new Set<bigint>();
      const interlocutors = [];

      for (const chat of chats) {
        const interlocutorId =
          chat.from_id !== userId ? chat.from_id : chat.to_id;

        if (!interlocutorIds.has(interlocutorId)) {
          interlocutorIds.add(interlocutorId);

          const interlocutorInfo = await db.users.findFirst({
            where: {
              id: interlocutorId,
            },
            select: {
              profile_photo_path: true,
              username: true,
            },
          });

          const lastMessage = await db.chat.findFirst({
            where: {
              OR: [
                {
                  from_id: interlocutorId,
                  to_id: userId,
                },
                {
                  from_id: userId,
                  to_id: interlocutorId,
                },
              ],
            },
            orderBy: {
              timestamp: "desc",
            },
            select: {
              message: true,
              timestamp: true,
            },
          });

          interlocutors.push({
            interlocutor_id: interlocutorId.toString(),
            profile_photo_path: interlocutorInfo?.profile_photo_path || null,
            username: interlocutorInfo?.username || null,
            last_message: lastMessage
              ? {
                  message: lastMessage.message,
                  timestamp: lastMessage.timestamp,
                }
              : null,
          });
        }
      }

      return interlocutors;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  }
}
