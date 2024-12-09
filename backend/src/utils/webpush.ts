import webpush from "web-push";

// Generate VAPID keys (lakukan sekali dan simpan)
const vapidKeys = webpush.generateVAPIDKeys();

export const configureWebPush = () => {
  webpush.setVapidDetails(
    `mailto:${process.env.CONTACT_EMAIL || "tazkia.nizami@gmail.com"}`,
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
};

export const sendPushNotification = async (
  subscription: webpush.PushSubscription,
  payload: string
) => {
  try {
    await webpush.sendNotification(subscription, payload);
    return true;
  } catch (error) {
    console.error("Error sending push notification:", error);
    return false;
  }
};

export const getVapidPublicKey = () => vapidKeys.publicKey;
