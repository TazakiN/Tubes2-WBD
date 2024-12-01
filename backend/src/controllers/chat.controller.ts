import { ChatService } from "../services/chat.service";

export class ChatController {
  static async getChatConversation(userId: string, interlocutorId: string) {
    try {
      return await ChatService.getChatConversation(
        BigInt(userId),
        BigInt(interlocutorId)
      );
    } catch (error) {
      throw error;
    }
  }
  static async getChatInterlocutorsHistory(userId: string) {
    try {
      return await ChatService.getChatInterlocutorsHistory(BigInt(userId));
    } catch (error) {
      throw error;
    }
  }
}
