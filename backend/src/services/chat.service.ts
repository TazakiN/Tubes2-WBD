import db from "../config/db";

export class ChatService {
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

      const interlocutors = new Set<string>();

      chats.forEach((chat) => {
        if (chat.from_id !== userId) {
          interlocutors.add(chat.from_id.toString());
        }
        if (chat.to_id !== userId) {
          interlocutors.add(chat.to_id.toString());
        }
      });

      return Array.from(interlocutors);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  }
}
