import { ChatService } from "../services/chat.service";

export class ChatController {
  static async getChatInterlocutorsHistory(userId: string) {
    try {
      return await ChatService.getChatInterlocutorsHistory(BigInt(userId));
    } catch (error) {
      throw error;
    }
  }
}
