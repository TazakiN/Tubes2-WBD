import { Hono } from "hono";
import { getVapidPublicKey, sendPushNotification } from "../utils/webpush";
import { push_subscriptions } from "@prisma/client";
import { getCookie } from "hono/cookie";
import db from "../config/db";
import { getUserIDbyTokenInCookie } from "../utils/jwt";

// TODO: Simpan subscription di database

export const pushRoutes = new Hono();

pushRoutes.get("/vapid-public-key", (c) => {
  return c.json({ publicKey: getVapidPublicKey() });
});

pushRoutes.post("/subscribe", async (c) => {
  try {
    const subscription = await c.req.json();
    const token = getCookie(c, "token");
    const user_id = token ? BigInt(await getUserIDbyTokenInCookie(c)) : null;

    const existingSubscription = await db.push_subscriptions.findFirst({
      where: { endpoint: subscription.endpoint },
    });

    if (!existingSubscription) {
      await db.push_subscriptions.create({
        data: {
          user_id,
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          },
        },
      });
    } else {
      await db.push_subscriptions.update({
        where: { endpoint: subscription.endpoint },
        data: {
          user_id,
          keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          },
        },
      });
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

// pushRoutes.post("/send-notification", async (c) => {
//   try {
//     const { title, body } = await c.req.json();

//     const payload = JSON.stringify({
//       title,
//       body,
//       icon: "/icon.png",
//     });

//     const sendPromises = (await db.push_subscriptions.findMany()).map(
//       async (subscription: push_subscriptions) => {
//         try {
//           await sendPushNotification(subscription, payload);
//         } catch (error) {
//           console.error("Gagal mengirim notifikasi ke", subscription.endpoint);
//         }
//       }
//     );

//     await Promise.all(sendPromises);

//     return c.json({
//       status: "success",
//       message: "Notifikasi terkirim",
//     });
//   } catch (error) {
//     console.error("Gagal mengirim notifikasi:", error);
//     return c.json(
//       {
//         status: "error",
//         message: "Gagal mengirim notifikasi",
//       },
//       500
//     );
//   }
// });

pushRoutes.post("/unsubscribe", async (c) => {
  try {
    const { endpoint } = await c.req.json();
    await db.push_subscriptions.deleteMany({
      where: { endpoint },
    });
    return c.json({ status: "success" });
  } catch (error) {
    return c.json({ status: "error" }, 500);
  }
});
