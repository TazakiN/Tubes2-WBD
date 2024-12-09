import { Hono } from "hono";
import { getVapidPublicKey, sendPushNotification } from "../utils/webpush";

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// TODO: Simpan subscription di database
const subscriptions: PushSubscription[] = [];

export const pushRoutes = new Hono();

pushRoutes.get("/vapid-public-key", (c) => {
  return c.json({ publicKey: getVapidPublicKey() });
});

pushRoutes.post("/subscribe", async (c) => {
  try {
    const subscription = (await c.req.json()) as PushSubscription;

    const existingSubscription = subscriptions.find(
      (sub) => sub.endpoint === subscription.endpoint
    );

    if (!existingSubscription) {
      subscriptions.push(subscription);
    }

    return c.json({
      status: "Subscription berhasil",
      message: "Berhasil mendaftarkan subscription",
    });
  } catch (error) {
    console.error("Gagal subscribe:", error);
    return c.json(
      {
        status: "error",
        message: "Gagal mendaftarkan subscription",
      },
      500
    );
  }
});

pushRoutes.post("/send-notification", async (c) => {
  try {
    const { title, body } = await c.req.json();

    const payload = JSON.stringify({
      title,
      body,
      icon: "/icon.png",
    });

    const sendPromises = subscriptions.map((sub) =>
      sendPushNotification(sub, payload)
    );

    await Promise.all(sendPromises);

    return c.json({
      status: "success",
      message: "Notifikasi terkirim",
    });
  } catch (error) {
    console.error("Gagal mengirim notifikasi:", error);
    return c.json(
      {
        status: "error",
        message: "Gagal mengirim notifikasi",
      },
      500
    );
  }
});
