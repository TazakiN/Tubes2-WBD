import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { upgradeWebSocket } from "../index";
import { WSContext } from "hono/ws";
import { ChatService } from "../services/chat.service";
import { PushService } from "../services/push.service";
import { sendPushNotification } from "./webpush";
import { UsersService } from "../services/users.service";

const clients = new Map<string, WSContext>();

export function websocketHandler() {
  return upgradeWebSocket((c) => {
    let userId: string;

    return {
      onOpen: async (_event, ws) => {
        const token = getCookie(c, "token");
        if (!token) {
          ws.close();
          return;
        }
        const payload = await verify(token, process.env.JWT_SECRET!);
        userId = (payload as any).id;
        clients.set(userId, ws);
        console.log(`User ${userId} connected`);
      },
      onMessage: async (event, ws) => {
        const data = JSON.parse(event.data as string);
        const { to_id, message } = data;
        console.log(`User ${userId} sent message to ${to_id}: ${message}`);

        ChatService.saveChatMessage(
          BigInt(userId),
          BigInt(to_id as string),
          message as string
        );

        const recipientSocket = clients.get(to_id);
        if (recipientSocket) {
          recipientSocket.send(
            JSON.stringify({
              from_id: userId,
              message,
              timestamp: new Date(),
            })
          );
        } else {
          const subscriber = await PushService.getLastSubscriberByUserId(
            BigInt(to_id)
          );

          const senderName = await UsersService.getUserNameByID(BigInt(userId));

          const payload = JSON.stringify({
            title: "New message from " + senderName,
            body: message,
            icon: "/favicon.ico",
          });

          if (subscriber.length > 0) {
            subscriber.forEach((sub) => {
              const { endpoint, keys } = sub;
              const pushSubscription = {
                endpoint,
                keys: keys as { p256dh: string; auth: string },
              };

              sendPushNotification(pushSubscription, payload);
            });
          }
        }
      },
      onClose: () => {
        clients.delete(userId);
        console.log(`User ${userId} disconnected`);
      },
    };
  });
}
