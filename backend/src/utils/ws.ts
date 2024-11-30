import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { upgradeWebSocket } from "../index";
import { WSContext } from "hono/ws";

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
      onMessage: async (event, _) => {
        const data = JSON.parse(event.data as string);
        const { to_id, message } = data;
        const recipientSocket = clients.get(to_id);
        // TODO: simpan pesan ke database
        if (recipientSocket) {
          recipientSocket.send(JSON.stringify(data));
        } else {
          // TODO: kirim notifikasi ke PWA
        }
      },
    };
  });
}
